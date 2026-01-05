---
title: "How we perform Continuous Integration (CI) on Jupyter Notebooks"
date: 2020-02-04T10:02:44Z
draft: false
toc: true
images:
tags:
   - automation
   - python
   - conda
   - howto
---

> I first wrote this blog when I was working at City Science


## Why do we need CI?

> It works on my machine…

I bet you’ve all heard that one before! I’m not going to explain all the benefits of CI here because there’s a great page over on the ThoughtWorks website. The features that we’re interested in are; reproducibility and validation. The Jupyter notebook can be a blessing and a curse. Its cell by cell execution can lure us into a false sense of security whereby we think the whole notebook is working, but we have cached a previous execution and forget to re-run the whole book. This is the scenario we wish to protect against.

## Pre-requisites

Whilst we have Windows desktops, we work with the Git Bash terminal. Our solution uses shell scripts, so, if you would like to reuse our scripts you will need to do the same.
KISS

> Keep it simple, stupid

At City Science we use Jupyter Notebooks as a tool to support experimentation. We like [Jonathan Whitmore’s concept of a lab(dev) notebook](https://www.svds.com/tbt-jupyter-notebook-best-practices-data-science/) to describe this stage. Whilst we are advocates of shipping quality through the use of linting and testing, at the lab book stage we dont let those disciplines distract us. Our requirement for CI on the lab books is simple; run the book from start to finish with no errors.

### nbconvert

nbconvert is a tool for converting notebooks to different formats. One of its features is that it can execute the notebook and report on errors. This is quite cool because it gives us a way to execute our notebooks from the terminal:

`jupyter nbconvert --to notebook --execute --ExecutePreprocessor.kernel_name=python3 --output output.ipynb <path_to_ipynb>`

For the most part this is trivial, but one of the lesser obvious options is the `--ExecutePreprocessor.kernel_name=python3` argument. At the time of writing there was an issue with the tool which prevented nbconvert honouring the environment defined in the `.ipynb`. To overcome this we source our environment, but tell the tool we are using python3. More on environments later.

### Opt-out

We encourage our Data Scientists to ensure their notebooks are friendly for others to use, however, there are occasions when they dont want to CI their books. When this situation arises, the DS can add an empty file with name noci and that project is excluded from the CI.

`touch /path/to/my/notebook/noci`

## Environments

This was the hardest problem to solve. We didn’t want to slow productivity by enforcing an `environment.yml` for every notebook, but we also need to replicate the environment on the CI server. To overcome this we use the 80/20 rule. The idea here is that 80% of our notebooks should work with the “base” environment, but for the 20% that dont, they will need to define their own environments using an `environment.yml`.

Our repositories are structured similar to:
```
Analysis
│   .flake8
│   .gitignore
│   .gitlab-ci.yml
│   ci_env
│   environment.yml
│   README.md
│   run_ci
│
├───PJH
│   ├───2017-02-17-furnessing-IPF
│   │       IPF_flavours.ipynb
│   │
│   └───2017-03-01-gravity-model-BPR-method
│           BPR_gravity_model.ipynb
│           environment.yml
│
└────RPB
    │   environment.yaml
    │
    ├───2017-02-12-notebook-git-filter
    │       stripped.ipnb
    │
    └───2017-03-01-turn
            environment.yml
            turn.ipynb
```
Each scientist creates a directory at the top level with his/her intials. Their notebooks are held in a directory below that which includes a date and descriptive name. You will notice a few environment.yml files in this structure. The CI will load the environment files in the following order; in the absence of a environment.yml at the user project level, it will look for one in the user directory. If neither exist it will default to loading the environment.yml at the root.
Validate a single notebook

There was one final feature that we wanted to implement, and that was the ability to run a single notebook. Whilst running all the notebooks in CI is fine, when we’re working alone we only care about our own project. We knew that these efforts would result in a script, and we wanted a command like:

`./run_ci /path/to/my/notebook.ipynb` to execute a single notebook.

and

`./run_ci` to execute all notebooks.
…gimme the code already!

Here’s our magic script. Simply place it at the root of working directory, then run it with the commands above.
```bash
#!/bin/bash

set -e ; set -u

source ci_env

ENVFILE='environment.yml'


function process_notebook(){
    local path="$1"

    local filename="${path##*/}"
    local folder="${path%/*}"
    local basename="${filename%.*}"
    local envfile=''
    local envname=''
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    NC='\033[0m' # No Color    

    for location in "$folder/../../.." "$folder/../.." "$folder/.." "$folder" ; do
        [[ -f "$location/$ENVFILE" ]] && envfile=$location/$ENVFILE && envname=$(stat --format '%i' $location/$ENVFILE)
    done

    printf "=====================\n"
    printf "Envfile:\t$envfile\n"
    printf "Envname:\t$envname\n"
    printf "Path:\t\t$path\n"
    printf "Filename:\t${filename}\n"
    printf "Folder:\t\t${folder}\n"
    printf "Basename:\t${basename}\n"
    printf "=====================\n"

    # conda create
    conda env update --prune --quiet --name $envname --file "$envfile"
    convert_notebook "$envname" "$path"

    printf "${GREEN}====> PASSED:${NC} $path\n"
}

function convert_notebook() {
    (
     # conda activate
    set +u
    source activate $1
    set -u
    # run notebook
    jupyter nbconvert --to notebook --execute \
    --ExecutePreprocessor.timeout=60 \
    --output output.ipynb \
    "$2" || {  printf "${RED}====> FAILED:${NC} $2\n" ; exit 99 ; }
    )
}

if [ $# -eq 1 ]; then
    process_notebook "$1"
else
    notebookcount=0
    while read -d $'\0' path ; do
        # if the noci flag was passed, dont look for a noci file
        if [[ -f "${path%/*}/noci" ]] ; then
            echo "===> noci found for ${path##*/}. skipping it."
            continue
        fi
        process_notebook "$path"
        let notebookcount=notebookcount+1
    done < <(find . -name \*.ipynb -print0)
    echo The notebook count is "$notebookcount"
fi
```
## CI?

We use Gitlab, and CI is as simple as adding the following code to a `.gitlab-ci.yml` file in our version control repository.
```yaml
variables:
  GIT_DEPTH: "1"

image: cityscience/conda-build3:4.2.12-0.1

build_job:
  script:
    - chmod +x run_ci
    - source run_ci
```
