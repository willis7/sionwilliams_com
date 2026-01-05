---
title: "Creating a Wake-Up Light Automation with the Help of ChatGPT"
date: 2023-10-10T20:34:16+01:00
draft: false
toc: false
images:
tags:
   - homelab
   - howto
---

Today, I'd like to share my unique interaction with ChatGPT, OpenAI's state-of-the-art language model. I was trying to create a wake-up light automation in Home Assistant, and ChatGPT came to the rescue!

## The Problem:

I wanted a way to wake up in the morning gently. Traditional alarms can be jarring, and I've read about the benefits of waking up with natural light or, in my case, a simulated sunrise. The idea is to transition a light source from red to amber and finally to white over 30 minutes, simulating a sunrise. Given that I had a [Philips Hue Bloom](https://amzn.to/3F9NsjJ) in my Home Assistant setup, I was all set to create the automation – but I needed some guidance.

## Enter ChatGPT:

I reached out to ChatGPT, explained my idea, and asked for assistance. Without missing a beat, the virtual assistant broke down the process step by step:

1. **Identify the Right Configuration File**: ChatGPT pointed out that I needed to work within the `automations.yaml` file within Home Assistant. For those new to the platform, this is where you can define a series of automated actions based on various triggers.
2. **Define the Automation**: ChatGPT provided a detailed YAML code snippet, which I could paste directly into my `automations.yaml` file. The automation was set to trigger at 6:15am. Initially, the light would turn on with a red hue. Over 10 minutes, it would transition to amber and white over the subsequent 20 minutes.
3. **Reload and Test**: Once the automation was in place, I was reminded to reload the automation or restart Home Assistant. With that done, my new wake-up light was ready to be tested!

Here's the configuration it wrote (which worked without any changes):
```yaml
- id: 'wake_up_light'
  alias: 'Wake Up Light Transition'
  trigger:
    platform: time
    at: "06:15:00"
  action:
    - service: light.turn_on
      entity_id: light.hue_bloom_1
      data:
        brightness_pct: 1
        rgb_color: [255, 0, 0] # red
        transition: 0
    - delay: '00:10:00'
    - service: light.turn_on
      entity_id: light.hue_bloom_1
      data:
        brightness_pct: 50
        rgb_color: [255, 191, 0] # amber
        transition: 600
    - delay: '00:10:00'
    - service: light.turn_on
      entity_id: light.hue_bloom_1
      data:
        brightness_pct: 100
        rgb_color: [255, 255, 255] # white
        transition: 600
```

## The Outcome:

Thanks to ChatGPT, I now have a personalised wake-up light that provides a gentle introduction to the day. Gone are the abrupt alarms, replaced by a simulated sunrise right in my bedroom. This experience goes to show the practical utility of advanced language models like ChatGPT. From coding help to crafting morning routines, the possibilities seem endless!

## Final Thoughts:

The world of smart home automation can be daunting. Even a simple task can seem complex with countless components, integrations, and configurations. However, with resources like ChatGPT, even beginners can easily navigate these challenges. Whether you're a seasoned home automation enthusiast or just starting out, remember that tools and communities are ready to assist!
