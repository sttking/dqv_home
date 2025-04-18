FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/daquvhome-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} myboot.jar
VOLUME ["/home/ec2-user/logs"]
ENTRYPOINT ["java", "-jar", "/myboot.jar"]
