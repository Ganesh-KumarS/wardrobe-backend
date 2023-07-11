import scanner from "sonarqube-scanner";
scanner(
{
serverUrl: "http://localhost:9001",
login: "test",
password: "10decoders",
options: {"sonar.sources": "./src",
},
},
() => process.exit()
);