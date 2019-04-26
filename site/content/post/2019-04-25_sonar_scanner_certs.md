+++
banner = "banners/placeholder.png"
categories = ["devops"]
date = "2019-04-26T00:01:00+01:00"
tags = ["sonarqube","pki", "certs"]
title = "How to Configure SonarQube Scanner for HTTPS Sonar Server?"
+++

## Issue
* I have a Sonar server configured with HTTPS and want to configure the SonarQube plugin in Jenkins to use it
* My job fails to build because of the following exception with the Sonar Scanner:

```
10:05:19.726 ERROR: Error during SonarQube Scanner execution
org.sonarsource.scanner.api.internal.ScannerException: Unable to execute SonarQube
	at org.sonarsource.scanner.api.internal.IsolatedLauncherFactory$1.run(IsolatedLauncherFactory.java:84)
	at org.sonarsource.scanner.api.internal.IsolatedLauncherFactory$1.run(IsolatedLauncherFactory.java:71)
	at java.security.AccessController.doPrivileged(Native Method)
	at org.sonarsource.scanner.api.internal.IsolatedLauncherFactory.createLauncher(IsolatedLauncherFactory.java:71)
	at org.sonarsource.scanner.api.internal.IsolatedLauncherFactory.createLauncher(IsolatedLauncherFactory.java:67)
	at org.sonarsource.scanner.api.EmbeddedScanner.doStart(EmbeddedScanner.java:218)
	at org.sonarsource.scanner.api.EmbeddedScanner.start(EmbeddedScanner.java:156)
	at org.sonarsource.scanner.cli.Main.execute(Main.java:72)
	at org.sonarsource.scanner.cli.Main.main(Main.java:61)
Caused by: java.lang.IllegalStateException: Fail to download libraries from server
	at org.sonarsource.scanner.api.internal.Jars.downloadFiles(Jars.java:93)
	at org.sonarsource.scanner.api.internal.Jars.download(Jars.java:70)
	at org.sonarsource.scanner.api.internal.JarDownloader.download(JarDownloader.java:39)
	at org.sonarsource.scanner.api.internal.IsolatedLauncherFactory$1.run(IsolatedLauncherFactory.java:75)
	... 8 more
Caused by: javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	at sun.security.ssl.Alerts.getSSLException(Alerts.java:192)
	at sun.security.ssl.SSLSocketImpl.fatal(SSLSocketImpl.java:1949)
	at sun.security.ssl.Handshaker.fatalSE(Handshaker.java:302)
	at sun.security.ssl.Handshaker.fatalSE(Handshaker.java:296)
	at sun.security.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1509)
	at sun.security.ssl.ClientHandshaker.processMessage(ClientHandshaker.java:216)
	at sun.security.ssl.Handshaker.processLoop(Handshaker.java:979)
	at sun.security.ssl.Handshaker.process_record(Handshaker.java:914)
	at sun.security.ssl.SSLSocketImpl.readRecord(SSLSocketImpl.java:1062)
	at sun.security.ssl.SSLSocketImpl.performInitialHandshake(SSLSocketImpl.java:1375)
	at sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1403)
	at sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1387)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.io.RealConnection.connectTls(RealConnection.java:239)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.io.RealConnection.establishProtocol(RealConnection.java:196)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.io.RealConnection.buildConnection(RealConnection.java:171)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.io.RealConnection.connect(RealConnection.java:111)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.http.StreamAllocation.findConnection(StreamAllocation.java:187)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.http.StreamAllocation.findHealthyConnection(StreamAllocation.java:123)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.http.StreamAllocation.newStream(StreamAllocation.java:93)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.http.HttpEngine.connect(HttpEngine.java:296)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.internal.http.HttpEngine.sendRequest(HttpEngine.java:248)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.RealCall.getResponse(RealCall.java:243)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.RealCall$ApplicationInterceptorChain.proceed(RealCall.java:201)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.RealCall.getResponseWithInterceptorChain(RealCall.java:163)
	at org.sonarsource.scanner.api.internal.shaded.okhttp.RealCall.execute(RealCall.java:57)
	at org.sonarsource.scanner.api.internal.ServerConnection.callUrl(ServerConnection.java:113)
	at org.sonarsource.scanner.api.internal.ServerConnection.downloadString(ServerConnection.java:98)
	at org.sonarsource.scanner.api.internal.Jars.downloadFiles(Jars.java:78)
	... 11 more
Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	at sun.security.validator.PKIXValidator.doBuild(PKIXValidator.java:387)
	at sun.security.validator.PKIXValidator.engineValidate(PKIXValidator.java:292)
	at sun.security.validator.Validator.validate(Validator.java:260)
	at sun.security.ssl.X509TrustManagerImpl.validate(X509TrustManagerImpl.java:324)
	at sun.security.ssl.X509TrustManagerImpl.checkTrusted(X509TrustManagerImpl.java:229)
	at sun.security.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:124)
	at sun.security.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1491)
	... 34 more
Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
	at sun.security.provider.certpath.SunCertPathBuilder.build(SunCertPathBuilder.java:146)
	at sun.security.provider.certpath.SunCertPathBuilder.engineBuild(SunCertPathBuilder.java:131)
	at java.security.cert.CertPathBuilder.build(CertPathBuilder.java:280)
	at sun.security.validator.PKIXValidator.doBuild(PKIXValidator.java:382)
	... 40 more
```


## Resolution
You need to import the SonarQube certificate into the JVM that runs the SonarQube Scanner.

In order to make this work:

* Create a keystore
* Import the SonarQube SSL certificate in the keystore
* Set the JVM opts to use the keystore

When running the scanner:

for (*nix):

    export SONAR_SCANNER_OPTS="-Djavax.net.ssl.trustStore=/path/to/sonar.keystore -Djavax.net.ssl.trustStorePassword=changeit"

for (Windows):

    export SONAR_SCANNER_OPTS=-Djavax.net.ssl.trustStore=c:\sonar.keystore -Djavax.net.ssl.trustStorePassword=changeit


## Troubleshooting Tips
Additionally, you can add other flags to debug SSL issues for the Sonnar Scanner:

* `-X`: Activate debugging of the sonar execution
* `-Djavax.net.debug="ssl,handshake"`: Activate debugging of the SSL Handshake between JVM process running the scanner and the Sonar Server
