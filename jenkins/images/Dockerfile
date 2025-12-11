FROM jenkins/jenkins:lts
USER root
COPY ./gitlab.192.168.49.2.nip.io.crt /usr/local/share/ca-certificates/
RUN keytool -importcert -trustcacerts -file /usr/local/share/ca-certificates/gitlab.192.168.49.2.nip.io.crt \
	-keystore /opt/java/openjdk/lib/security/cacerts -storepass changeit -noprompt && \
	update-ca-certificates
USER jenkins
