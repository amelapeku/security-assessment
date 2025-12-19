const questions = [
  // =========================
  // LT-1: Enable threat detection capabilities
  // =========================
  { type: "section", title: "LT-1: Enable threat detection capabilities" },

  { q: "Have you deployed cloud-native threat detection capabilities for compute, storage, database, and identity services, including behavioral analytics and threat intelligence-driven monitoring?", 
    risk: "⚠️ Without cloud-native threat detection, malicious activity such as compromised accounts or lateral movement may go undetected." 
  },
  { q: "Have you enabled threat detection for all critical Azure services using Microsoft Defender for Cloud, covering virtual machines, storage accounts, databases, containers, and Key Vault instances?", 
    risk: "⚠️ Without full service coverage, attackers can exploit unmonitored resources and compromise critical workloads." 
  },
  { q: "Is your security team familiar with Microsoft Defender for Cloud detection capabilities, including alert types, severity levels, and response expectations, as documented in the security alerts reference guide?", 
    risk: "⚠️ Without understanding detection capabilities, alerts may be misinterpreted or not acted on in time, increasing incident impact." 
  },
  { q: "For services without native threat detection capability, are data plane logs collected and routed to Microsoft Sentinel for custom analytics rules and behavioral detection?", 
    risk: "⚠️ Without custom detection for unsupported services, malicious activity may go undetected." 
  },
  { q: "Have you configured alert filtering and analytics rules to reduce false positives and extract high-quality alerts from log data, tuning detection sensitivity based on workload criticality and risk tolerance?", 
    risk: "⚠️ Poorly tuned alerts generate noise or miss critical incidents, reducing monitoring effectiveness." 
  },

   { q: "Have you centralized security telemetry by aggregating alerts and log data from cloud security platforms, endpoint protection, identity systems, and application services into Azure Monitor or Microsoft Sentinel for unified analysis and correlation?", 
    risk: "⚠️ Without centralized telemetry, threats may go undetected due to fragmented visibility and delayed correlation." 
  },
  { q: "Have you deployed Microsoft Defender XDR to correlate threat detection across Microsoft 365 Defender, Microsoft Defender for Cloud, and Microsoft Entra ID with cross-domain incident grouping and automated investigation workflows?", 
    risk: "⚠️ Without a unified XDR platform, cross-domain attacks may not be identified and response may be slower or inconsistent." 
  },
  { q: "Is your security team building custom detection rules that match organization-specific threat patterns, attack indicators, and business logic violations not addressed by pre-built detections?", 
    risk: "⚠️ Without custom detection rules, unique or organization-specific attacks may go unnoticed." 
  },
  { q: "Have you integrated Microsoft Defender Threat Intelligence to enrich alerts with threat actor attribution, infrastructure reputation, vulnerability exploitation intelligence, and compromised indicator correlation?", 
    risk: "⚠️ Without threat intelligence enrichment, alerts may lack context, increasing the risk of misprioritization or missed threats." 
  },
  { q: "Is your security team leveraging threat intelligence indicators in Microsoft Sentinel for automated matching of observables such as IP addresses, domains, file hashes, and URLs against known malicious infrastructure and campaigns?", 
    risk: "⚠️ Without leveraging threat indicators, attacks using known malicious infrastructure may go undetected." 
  },

  // =========================
  // LT-2: Enable threat detection for identity and access management
  // =========================
  { type: "section", title: "LT-2: Enable threat detection for identity and access management" },
  { q: "Have you enabled comprehensive Microsoft Entra audit logging to provide complete traceability for all changes to identity resources, including user and group management, role assignments, application registrations, and policy modifications?", 
    risk: "⚠️ Without comprehensive audit logging, changes to identity resources may go untracked, increasing the risk of unauthorized access or misconfigurations." 
  },
  { q: "Is your security team monitoring authentication activities by tracking sign-in reports for all managed applications and user accounts to establish baselines and identify anomalies?", 
    risk: "⚠️ Without monitoring authentication activity, abnormal access patterns may go undetected, allowing potential compromises to persist." 
  },
  { q: "Have you enabled detection of risky sign-in patterns to flag authentication attempts from suspicious sources, impossible travel scenarios, unfamiliar locations, or leaked credentials?", 
    risk: "⚠️ Without monitoring risky sign-ins, signs of potential account compromise may be missed." 
  },
  { q: "Is your security team identifying compromised accounts by monitoring users flagged for risk and investigating accounts showing multiple risk indicators through automated or manual workflows?", 
    risk: "⚠️ Without identifying and investigating risky accounts, compromised identities may be abused, increasing exposure to attacks." 
  },
  { q: "Have you integrated Microsoft Entra ID logs with Azure Monitor, Microsoft Sentinel, or third-party SIEM platforms for advanced correlation, long-term retention, and cross-domain threat analytics?", 
    risk: "⚠️ Without SIEM integration, identity-related threats may not be correlated across domains, reducing detection and investigative capability." 
  },

    { q: "Have you deployed Microsoft Entra ID Protection to detect and remediate identity risks, including leaked credentials, sign-ins from anonymous IP addresses, malware-linked sources, and password spray attacks using machine learning and threat intelligence?", 
    risk: "⚠️ Without identity risk detection, compromised credentials and suspicious sign-ins may go unnoticed, increasing the likelihood of account compromise." 
  },
  { q: "Is your security team implementing risk-based access controls through Microsoft Entra Conditional Access policies, enforcing MFA for medium-risk sign-ins and blocking high-risk authentication attempts until remediation?", 
    risk: "⚠️ Without risk-based access controls, high-risk authentication attempts may succeed, allowing attackers to gain unauthorized access." 
  },
  { q: "Have you enabled Microsoft Defender for Cloud workload protection to monitor cloud infrastructure for identity threats, such as deprecated account usage, excessive failed authentication attempts, and anomalous service principal behaviors?", 
    risk: "⚠️ Without monitoring cloud identity threats, suspicious activity on infrastructure accounts may go undetected, increasing the risk of unauthorized access or privilege escalation." 
  },


  // =========================
  // LT-3: Enable logging for security investigation
  // =========================
  { type: "section", title: "LT-3: Enable logging for security investigation" },
  { q: "Have you enabled Azure Activity Logs for all subscriptions to capture management plane operations, including resource creation, modification, deletion (PUT, POST, DELETE), role assignments, policy changes, and administrative actions?", 
    risk: "⚠️ Without management plane activity logs, critical administrative changes may go untracked, increasing the risk of misconfigurations or unauthorized actions." 
  },
  { q: "Is your security team centralizing Activity Log collection by routing logs from management groups or subscriptions to a Log Analytics workspace for long-term retention, correlation, and compliance reporting?", 
    risk: "⚠️ Without centralized log collection, analysis and correlation of management activities may be incomplete, limiting visibility into potential threats." 
  },
  { q: "Have you enforced consistent Activity Log coverage across all subscriptions using Azure Policy to ensure diagnostic settings are applied and configuration drift is prevented?", 
    risk: "⚠️ Without consistent logging enforcement, new or misconfigured subscriptions may not generate necessary activity logs, creating blind spots." 
  },
  { q: "Is your security team capturing all Microsoft Entra sign-in events, including interactive, non-interactive, service principal, and managed identity authentications?", 
    risk: "⚠️ Without comprehensive sign-in logs, anomalous authentication activity may go undetected, increasing the risk of account compromise." 
  },
  { q: "Have you enabled Microsoft Entra audit logs to track all changes to users, groups, roles, applications, conditional access policies, and administrative units?", 
    risk: "⚠️ Without audit logs, changes to identity configurations may go untracked, increasing the risk of unauthorized access or misconfigurations." 
  },
  { q: "Is your security team extending Entra log retention by routing sign-in and audit logs to Log Analytics or Event Hub for retention beyond the default 30-day period?", 
    risk: "⚠️ Without extended log retention, historical identity events may be unavailable for forensic investigations or compliance audits." 
  },
  { q: "Have you integrated Microsoft Entra Connect Health logs in hybrid environments to monitor synchronization events, authentication failures, and on-premises Active Directory health?", 
    risk: "⚠️ Without hybrid identity monitoring, synchronization or authentication issues may go unnoticed, impacting security and operational stability." 
  },
  { q: "Is your security team correlating identity and management plane events with network infrastructure logs (NSG flow, Azure Firewall, VPN Gateway, Application Gateway) to provide context for security investigations?", 
    risk: "⚠️ Without correlating identity and network logs, attack patterns spanning identity and network layers may be missed, reducing detection effectiveness." 
  },
    { q: "Have you enabled Azure resource-level data plane logs to capture read, write, and delete operations across all platform services?", 
    risk: "⚠️ Without resource-level data plane logs, unauthorized or malicious changes to data and configurations may go undetected." 
  },
  { q: "Is your security team logging Azure Storage operations, including blob, file, queue, and table events with caller identity, source IP, and operation latency?", 
    risk: "⚠️ Without storage operation logs, suspicious access to storage resources may be missed, hindering forensic investigations." 
  },
  { q: "Have you configured Azure SQL Database auditing to log queries, schema changes, permission grants, authentication attempts, and administrative operations, routing logs to Log Analytics or storage accounts?", 
    risk: "⚠️ Without database auditing, unauthorized or risky database activity may go undetected, increasing risk of data compromise." 
  },
  { q: "Is your security team monitoring Azure Key Vault access operations including retrieval, rotation, deletion, and permission changes with full audit context?", 
    risk: "⚠️ Without Key Vault logs, access to sensitive secrets, keys, and certificates may be unmonitored, increasing risk of data leaks." 
  },
  { q: "Have you enabled Azure Cosmos DB diagnostic logs to capture data plane operations, query performance, partition key access, and throttling events for security and performance investigations?", 
    risk: "⚠️ Without Cosmos DB logging, suspicious or anomalous database activity may go unnoticed." 
  },
  { q: "Is your security team enabling diagnostic logging for other data platforms such as Azure Data Lake Storage, Azure Synapse Analytics, PostgreSQL/MySQL databases, and Azure Cache for Redis?", 
    risk: "⚠️ Without logging for additional data services, access and administrative activity may go untracked, creating blind spots." 
  },
  { q: "Have you configured Container Insights to collect container-level metrics, logs, and performance data from AKS, Azure Container Instances, and Azure Arc-enabled Kubernetes clusters?", 
    risk: "⚠️ Without container runtime monitoring, suspicious container activity and resource misuse may go undetected." 
  },
  { q: "Is your security team logging Azure Container Registry operations including image push/pull, repository access, authentication events, webhook calls, and vulnerability scan results?", 
    risk: "⚠️ Without container registry logging, unauthorized or malicious image activity may go unnoticed." 
  },
  { q: "Have you automated platform logging enablement using Microsoft Defender for Cloud to reduce manual configuration and ensure supported Azure services generate logs?", 
    risk: "⚠️ Without automated logging, some resources may remain unmonitored due to misconfigurations or oversight." 
  },
  { q: "Have you enforced consistent logging coverage for data services using Azure Policy to prevent configuration drift and remediate non-compliant resources?", 
    risk: "⚠️ Without policy enforcement, logging coverage may be inconsistent, leaving gaps in visibility." 
  },
  { q: "Is your security team enabling Azure App Service diagnostics to log application, web server, failed requests, deployment events, and detailed error messages?", 
    risk: "⚠️ Without App Service logging, application-level issues and attacks may go undetected." 
  },
  { q: "Have you configured Azure API Management diagnostics to capture API requests, responses, authentication failures, rate limit violations, and backend service errors?", 
    risk: "⚠️ Without API gateway logging, abuse, failures, or malicious API activity may be missed." 
  },
  { q: "Is your security team monitoring Azure Functions execution via Application Insights, capturing function executions, exceptions, performance metrics, and custom security events?", 
    risk: "⚠️ Without serverless function logging, malicious or failed function executions may go undetected." 
  },
  { q: "Have you enabled diagnostics for Azure Logic Apps to log workflow runs, trigger events, action results, and integration failures?", 
    risk: "⚠️ Without workflow logging, failures or abnormal activity in business process automation may be missed." 
  },
  { q: "Is your security team deploying Azure Monitor Agent to VMs to collect Security Event Logs, Syslog, performance counters, and custom log files?", 
    risk: "⚠️ Without VM monitoring, suspicious system activity or configuration changes may go unnoticed." 
  },
  { q: "Have you configured Windows Event Log collection for security events including authentication, privilege escalation, account management, and audit policy changes?", 
    risk: "⚠️ Without Windows security event collection, critical OS-level security incidents may be missed." 
  },
  { q: "Is your security team gathering Linux Syslog for authentication, system, and application-specific security logs?", 
    risk: "⚠️ Without Linux log collection, system and application attacks may go undetected." 
  },
  { q: "Have you enabled antimalware monitoring on Windows VMs to log malware detection, scan results, signature updates, and policy violations?", 
    risk: "⚠️ Without endpoint protection logs, malware infections may not be detected promptly." 
  },
  { q: "Is your security team implementing structured application logging with security context including user identity, source IP, request ID, operation type, and data classification labels?", 
    risk: "⚠️ Without structured logging, correlating security events for forensic analysis is difficult." 
  },
  { q: "Have you enabled Application Insights or equivalent APM telemetry to capture exceptions, custom security events, distributed tracing, and dependency tracking?", 
    risk: "⚠️ Without APM telemetry, application performance and security issues may not be detected or analyzed effectively." 
  },
  { q: "Is your security team logging application-layer security events including authentication attempts, authorization failures, input validation failures, and privilege escalations?", 
    risk: "⚠️ Without application security logging, attacks exploiting application logic or access controls may go undetected." 
  },
  { q: "Have you enabled logging for web application attacks including HTTP security headers, CSP violations, CORS enforcement, and session management events?", 
    risk: "⚠️ Without web application attack logging, attempts such as XSS, session hijacking, or misconfigurations may go unnoticed." 
  },
  { q: "Is your security team capturing Layer 7 attack attempts via API gateways and WAFs, including SQL injection, XSS, RCE, XXE, and business logic abuse patterns?", 
    risk: "⚠️ Without Layer 7 attack logging, web and API application attacks may go undetected." 
  },
  { q: "Have you configured logging to track API abuse, including rate limiting enforcement, authentication failures, bot detection, and malicious usage patterns?", 
    risk: "⚠️ Without API abuse logging, attackers may exploit APIs undetected, affecting availability and security." 
  },
  

  // =========================
  // LT-4: Enable network logging for security investigation
  // =========================
  { type: "section", title: "LT-4: Enable network logging for security investigation" },


  { q: "Have you enabled NSG flow logs to capture IP traffic information including source/destination IPs, ports, protocols, and allow/deny decisions for lateral movement detection?", 
    risk: "⚠️ Without NSG flow logs, suspicious lateral movement and network-based attacks may go undetected." 
  },
  { q: "Is your security team monitoring Azure Firewall logs and metrics, including rule processing, threat intelligence hits, and DNS proxy activity for centralized egress monitoring and threat detection?", 
    risk: "⚠️ Without firewall monitoring, malicious traffic or policy violations may go unnoticed, increasing risk of compromise." 
  },
  { q: "Have you enabled Web Application Firewall (WAF) logs to capture application-layer attack attempts such as SQL injection, cross-site scripting, and OWASP Top 10 violations with request details and blocking decisions?", 
    risk: "⚠️ Without WAF logging, application-layer attacks may not be detected or analyzed, leaving web applications vulnerable." 
  },
  { q: "Is your security team collecting DNS query logs to correlate network activity and detect DNS-based attacks, including tunneling, DGA domains, and command-and-control communications?", 
    risk: "⚠️ Without DNS query logging, DNS-based threats may go unnoticed, reducing network visibility and detection capability." 
  },
  { q: "Have you deployed comprehensive Azure network monitoring solutions and enabled Traffic Analytics in Log Analytics to gain insights into traffic patterns, security threats, bandwidth consumption, and policy violations?", 
    risk: "⚠️ Without centralized network monitoring and analytics, anomalous traffic and policy violations may be missed." 
  },

  // =========================
  // LT-5: Centralize security log management and analysis
  // =========================
  { type: "section", title: "LT-5: Centralize security log management and analysis" },

 { q: "Have you aggregated Azure activity logs and resource diagnostic logs from all services into a centralized Log Analytics workspace for cross-resource correlation and unified investigation workflows?", 
    risk: "⚠️ Without centralized log aggregation, security events may remain siloed, limiting detection and investigation effectiveness." 
  },
  { q: "Is your security team using Azure Monitor with KQL queries to analyze aggregated logs from Azure services, endpoints, network resources, and other security systems for pattern detection and investigation?", 
    risk: "⚠️ Without log query and analysis capability, suspicious patterns and anomalies may go unnoticed." 
  },
  { q: "Have you configured alert rules using aggregated logs to detect security threats and operational issues through correlation across multiple log sources?", 
    risk: "⚠️ Without correlated alerting, multi-source threats may not trigger timely detection and response." 
  },
  { q: "Is your security team establishing data governance for logs, including ownership, role-based access controls, storage locations, retention policies, and compliance alignment?", 
    risk: "⚠️ Without data governance, logs may be inaccessible, improperly retained, or non-compliant, limiting investigation and regulatory readiness." 
  },
  { q: "Have you deployed Microsoft Sentinel to provide SIEM and SOAR capabilities for centralized security analysis and incident response?", 
    risk: "⚠️ Without a SIEM platform, detection, correlation, and coordinated response across security events may be limited." 
  },
  { q: "Is your security team connecting relevant data sources to Sentinel, including Azure services, Microsoft 365, third-party security solutions, and on-premises systems, to establish comprehensive security visibility?", 
    risk: "⚠️ Without comprehensive data source integration, blind spots may exist, reducing threat detection coverage." 
  },
  { q: "Have you configured analytics rules in Sentinel to detect threats and automatically create incidents based on correlated security events across multiple sources and time periods?", 
    risk: "⚠️ Without analytics rules, correlated threats may go undetected and incidents may not be created automatically." 
  },
  { q: "Is your security team implementing automated response playbooks using Logic Apps to orchestrate containment, notification, and remediation actions for detected incidents?", 
    risk: "⚠️ Without automated response, incident response may be slower, inconsistent, or incomplete." 
  },
  { q: "Have you deployed Sentinel workbooks and dashboards for security monitoring, threat hunting, compliance reporting, and executive-level visibility?", 
    risk: "⚠️ Without monitoring dashboards, visibility into security posture and trends may be limited." 
  },
  { q: "Is your security team leveraging Microsoft Security Copilot integration with Sentinel to enable AI-powered incident investigation, threat hunting, and guided response using natural language queries?", 
    risk: "⚠️ Without AI-powered analysis, detection and investigation may rely solely on manual processes, slowing response and reducing efficiency." 
  },

  // =========================
  // LT-6: Configure log storage retention
  // =========================
  { type: "section", title: "LT-6: Configure log storage retention" },

  { q: "Have you routed Azure Activity Logs and other resource logs to appropriate storage locations based on retention requirements, compliance mandates, and investigation timelines, balancing hot vs. cold storage costs?", 
    risk: "⚠️ Without routing logs to appropriate storage, critical data may be inaccessible or lost, impacting investigations and compliance." 
  },
  { q: "Is your security team using Azure Monitor Log Analytics workspace to retain logs for 1-2 years to support active investigation, threat hunting, and operational analytics with KQL query capabilities?", 
    risk: "⚠️ Without short-to-medium term retention, important logs may expire before they can be analyzed for incidents or threats." 
  },
  { q: "Have you implemented long-term archival storage using Azure Storage, Data Explorer, or Data Lake for retention beyond 1-2 years to meet compliance requirements, leveraging cold/archive tiers to reduce costs?", 
    risk: "⚠️ Without long-term archival, logs may not meet regulatory retention requirements and historical analysis may be impossible." 
  },
  { q: "Is your security team forwarding logs externally via Azure Event Hubs to SIEM, data lakes, or third-party security systems when needed for multi-cloud visibility or legacy integrations?", 
    risk: "⚠️ Without external log forwarding, visibility across multiple environments or legacy systems may be incomplete." 
  },
  { q: "Have you configured Azure Storage account retention policies and lifecycle management for automatic tier transitions and deletion to align with compliance requirements?", 
    risk: "⚠️ Without storage account retention policies, logs may be deleted prematurely or retained inefficiently, affecting compliance and cost management." 
  },
  { q: "Is your security team planning long-term retention for Microsoft Sentinel logs, ensuring archival beyond Log Analytics workspace limits?", 
    risk: "⚠️ Without Sentinel log retention planning, extended investigation or regulatory compliance may be hindered due to workspace limitations." 
  },
  { q: "Have you configured continuous export and archival of Microsoft Defender for Cloud alerts and recommendations to meet retention requirements beyond native portal limits?", 
    risk: "⚠️ Without archiving Defender alerts, security alert history may be lost, reducing investigation and compliance capabilities." 
  },

  // =========================
  // LT-7: Use approved time synchronization sources
  // =========================
  { type: "section", title: "LT-7: Use approved time synchronization sources" },


  { q: "Have you configured Windows Azure compute resources to synchronize time using Microsoft default NTP servers through Azure host time sources, unless specific requirements dictate otherwise?", 
    risk: "⚠️ Without proper Windows time synchronization, logs may have inconsistent timestamps, making correlation and forensic analysis unreliable." 
  },
  { q: "Is your security team configuring Linux Azure compute resources to synchronize time using chrony or ntpd with Azure-provided or appropriate external NTP servers?", 
    risk: "⚠️ Without Linux time synchronization, system logs may have inaccurate timestamps, hindering detection, investigation, and audit processes." 
  },
  { q: "If deploying custom NTP servers, have you secured the UDP port 123 and restricted access to authorized clients only?", 
    risk: "⚠️ Without securing custom NTP servers, attackers could manipulate system time, compromising log integrity and time-based authentication mechanisms." 
  },
  { q: "Is your security team validating that all logs generated by Azure resources include timestamps with time zone information (preferably UTC) for unambiguous timeline reconstruction?", 
    risk: "⚠️ Without consistent timestamp formats, reconstructing event timelines across global deployments may be inaccurate or impossible." 
  },
  { q: "Have you implemented continuous monitoring of time drift across systems and configured alerts for significant synchronization issues (>5 seconds)?", 
    risk: "⚠️ Without monitoring time drift, discrepancies may impair log correlation, forensic analysis, and time-sensitive security controls." 
  },
];
