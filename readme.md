### Run Splunk Docker Container

```
docker run -d -p 8000:8000 -p 8088-8089:8088-8089 -e "SPLUNK_START_ARGS=--accept-license" -e "SPLUNK_PASSWORD=E7NK_6W*m_elWtPd" --name splunk splunk/splunk:latest
```

### Splunk REST API Reference Manual

https://docs.splunk.com/Documentation/Splunk/8.2.5/RESTREF/RESTinput

### Event Collector REST API

https://docs.splunk.com/Documentation/SplunkCloud/8.2.2112/Data/HECRESTendpoints


### Upload Data To Sluck
```
node ./splunk-upload.js --token=<token> --key=vulnerabilities ./data/cisa.json
```

### Download CVE List

https://cve.mitre.org/data/downloads/index.html

```
curl -v -H'If-Modified-Since: Sun, 20 Feb 2022 20:36:46 GMT' https://cve.mitre.org/data/downloads/allitems.csv
```

### Forwarding & Receiving

You can forward data from one Splunk Enterprise instance to another Splunk Enterprise instance or even to a non-Splunk system. The Splunk instance that performs the [forwarding](https://docs.splunk.com/Splexicon:Forwarding) is called a [forwarder](https://docs.splunk.com/Splexicon:Forwarder).


