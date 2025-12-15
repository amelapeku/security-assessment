const questions = [
  // Threat detection controls
  {
    q: "Have you deployed the threat detection capabilities of your cloud security posture management platform for compute, storage, database, and identity services, providing behavioral analytics and threat intelligence-driven monitoring?",
    risk: "⚠️ Without cloud-native threat detection, attacks on your cloud resources may go unnoticed and escalate before response."
  },
  {
    q: "Have you activated threat detection for all critical Azure services using Microsoft Defender for Cloud, covering virtual machines, storage accounts, databases, containers, and Key Vault instances?",
    risk: "⚠️ Critical services without threat detection can be exploited without alerts, increasing security risk."
  },
  {
    q: "Have your security teams familiarized themselves with available detection capabilities using the Microsoft Defender for Cloud security alerts reference guide to understand alert types, severity levels, and response requirements?",
    risk: "⚠️ Teams unaware of detection capabilities may not recognize alerts or respond appropriately, leading to delayed incident response."
  },
  {
    q: "For services without native threat detection capability, are data plane logs collected and routed to Microsoft Sentinel for custom analytics rules and behavioral detection?",
    risk: "⚠️ Without custom detection for unsupported services, malicious activity may go undetected."
  },
  {
    q: "Have you configured alert filtering and analytics rules to reduce false positives and extract high-quality alerts from log data, tuning detection sensitivity based on workload criticality and risk tolerance?",
    risk: "⚠️ Poorly tuned alerts generate noise or miss critical incidents, reducing the effectiveness of threat monitoring."
  },

  // Security telemetry & XDR
  {
    q: "Have you aggregated alerts and log data from cloud security platforms, endpoint protection, identity systems, and application services into Azure Monitor or Microsoft Sentinel for unified analysis and correlation?",
    risk: "⚠️ Without centralized telemetry, security events may be missed or difficult to correlate, reducing detection and response effectiveness."
  },
  {
    q: "Have you deployed Microsoft Defender XDR to correlate threat detection across Microsoft 365 Defender, Microsoft Defender for Cloud, and Microsoft Entra ID with cross-domain incident grouping and automated investigation workflows?",
    risk: "⚠️ Without a unified XDR platform, threats may go undetected across domains and response may be slower."
  },
  {
    q: "Have you created custom analytics rules matching organization-specific threat patterns, attack indicators, and business logic violations that pre-built detections cannot address?",
    risk: "⚠️ Relying only on pre-built detections may leave gaps for threats unique to your organization."
  },
  {
    q: "Have you integrated Microsoft Defender Threat Intelligence to enrich alerts with threat actor attribution, infrastructure reputation, vulnerability exploitation intelligence, and compromised indicator correlation?",
    risk: "⚠️ Without threat intelligence enrichment, alerts may lack context, making it harder to prioritize and respond effectively."
  },
  {
    q: "Have you implemented threat intelligence indicators in Microsoft Sentinel for automated matching of observables such as IP addresses, domains, file hashes, and URLs against known malicious infrastructure and threat actor campaigns?",
    risk: "⚠️ Without automated matching of threat indicators, malicious activity may go undetected or require manual investigation."
  },

  // Audit & authentication
  {
    q: "Have you activated Microsoft Entra audit logs to provide complete traceability for all changes to identity resources including user and group management, role assignments, application registrations, and policy modifications?",
    risk: "⚠️ Without comprehensive audit logging, changes to identity resources may go unnoticed, preventing accountability and traceability."
  },
  {
    q: "Do you track sign-in reports for all managed applications and user accounts to establish baselines and identify anomalies?",
    risk: "⚠️ Failure to monitor authentication activities can allow unusual or malicious access to go undetected."
  },
  {
    q: "Have you enabled monitoring of risky sign-ins to flag authentication attempts from suspicious sources, impossible travel scenarios, unfamiliar locations, or leaked credential usage?",
    risk: "⚠️ Without detecting risky sign-in patterns, compromised accounts may remain active, increasing security exposure."
  },
  {
    q: "Do you monitor users flagged for risk to detect accounts showing multiple risk indicators requiring immediate investigation and remediation?",
    risk: "⚠️ Failure to identify compromised accounts can allow attackers to maintain access and perform malicious actions."
  },
  {
    q: "Have you routed Microsoft Entra ID logs to Azure Monitor, Microsoft Sentinel, or third-party SIEM platforms for advanced correlation, long-term retention, and cross-domain threat detection analytics?",
    risk: "⚠️ Without SIEM integration, important logs may not be analyzed effectively, reducing visibility into threats and incidents."
  },

  // Identity risk & access
  {
    q: "Have you enabled Microsoft Entra ID Protection to detect and remediate identity risks including leaked credentials, sign-ins from anonymous IP addresses, malware-linked sources, and password spray attacks using machine learning and threat intelligence?",
    risk: "⚠️ Without identity risk detection, compromised credentials and risky sign-ins may go unnoticed."
  },
  {
    q: "Have you configured Identity Protection policies to enforce adaptive authentication requirements through Microsoft Entra Conditional Access, requiring MFA for medium-risk sign-ins and blocking high-risk authentication attempts until remediation?",
    risk: "⚠️ Without risk-based access controls, risky authentication attempts may succeed, increasing exposure."
  },
  {
    q: "Have you enabled Microsoft Defender for Cloud workload protection to detect suspicious identity activities including deprecated account usage, excessive failed authentication attempts, and anomalous service principal behaviors?",
    risk: "⚠️ Without monitoring identity threats in cloud workloads, suspicious activities may go undetected."
  },

  // Management plane logging
  {
    q: "Have you activated Azure Activity Logs for all subscriptions to capture management plane operations including resource creation, modification, deletion, role assignments, policy changes, and administrative actions?",
    risk: "⚠️ Without management plane logging, changes to resources may go untracked, hindering investigations."
  },
  {
    q: "Have you configured diagnostic settings to route Activity Logs to a centralized Log Analytics workspace for long-term retention, correlation analysis, and compliance reporting?",
    risk: "⚠️ Without centralized log collection, it is difficult to perform cross-subscription analysis or meet compliance requirements."
  },
  {
    q: "Have you deployed Azure Policy to enforce diagnostic settings across all subscriptions ensuring consistent Activity Log collection and preventing configuration drift?",
    risk: "⚠️ Without consistent logging coverage, new subscriptions may lack auditing, creating blind spots."
  },

  // Authentication & identity changes
  {
    q: "Have you enabled Microsoft Entra sign-in logs to capture all user and service principal authentication events including interactive, non-interactive, and managed identity sign-ins?",
    risk: "⚠️ Without comprehensive authentication logging, suspicious sign-ins may go undetected."
  },
  {
    q: "Have you enabled Microsoft Entra audit logs to track all changes including user/group management, role assignments, application registrations, conditional access policy modifications, and administrative unit changes?",
    risk: "⚠️ Without audit tracking, identity changes may not be fully monitored, increasing risk of misuse."
  },
  {
    q: "Have you configured Microsoft Entra diagnostic settings to route sign-in and audit logs to Log Analytics workspace or Event Hub for extended retention beyond the default 30-day period?",
    risk: "⚠️ Without extended retention, historical data may be unavailable for forensic investigations."
  },
  {
    q: "For hybrid environments, have you integrated Microsoft Entra Connect Health logs to monitor synchronization events, authentication failures, and on-premises Active Directory integration health?",
    risk: "⚠️ Without hybrid identity monitoring, on-premises issues may affect cloud authentication visibility."
  },
  {
    q: "Have you enabled network infrastructure logs (NSG flow logs, Azure Firewall logs, VPN Gateway diagnostics, Application Gateway logs) to provide network context for security investigations correlating identity and control plane events?",
    risk: "⚠️ Without correlating network logs, attacks spanning network and identity layers may go unnoticed."
  },

  // Data plane logging
  {
    q: "Have you activated Azure resource logs for data plane operations within Azure services including read, write, and delete operations across all platform services?",
    risk: "⚠️ Without data plane logging, malicious or unauthorized actions on resources may go undetected."
  },
  {
    q: "Have you enabled Azure Storage diagnostic logs to capture blob, file, queue, and table storage operations including caller identity, source IP, and operation latency?",
    risk: "⚠️ Without storage operation logging, forensic investigations may lack critical evidence."
  },
  {
    q: "Have you configured Azure SQL Database auditing to log queries, schema changes, permission grants, authentication attempts, and administrative operations, routing logs to Log Analytics workspace or storage account?",
    risk: "⚠️ Without database auditing, unauthorized or suspicious activity may go unnoticed."
  },
  {
    q: "Have you enabled Azure Key Vault diagnostic logs to capture all key, secret, and certificate access operations including retrieval, rotation, deletion, and permission changes?",
    risk: "⚠️ Without key vault access logging, sensitive asset access may be untracked, increasing risk."
  },
  {
    q: "Have you configured Azure Cosmos DB diagnostic logs to capture data plane operations, query performance, partition key access patterns, and throttling events?",
    risk: "⚠️ Without NoSQL logging, performance issues or malicious access may go undetected."
  },
  {
    q: "Have you enabled diagnostic logging for additional data platforms including Azure Data Lake Storage, Synapse Analytics, PostgreSQL/MySQL, and Redis capturing data access and administrative operations?",
    risk: "⚠️ Without logging across all data platforms, security and operational incidents may be missed."
  },

  // Application & serverless logging
  {
    q: "Have you enabled Azure App Service diagnostics to capture application logs, web server logs, error messages, failed request tracing, and deployment logs for web applications and APIs?",
    risk: "⚠️ Without web application logging, attacks or failures may go unnoticed."
  },
  {
    q: "Have you configured Azure API Management diagnostics to log API requests, responses, authentication failures, rate limit violations, policy execution details, backend errors, and subscription events?",
    risk: "⚠️ Without API gateway logging, malicious or abnormal API activity may go undetected."
  },
  {
    q: "Have you enabled Azure Functions monitoring with Application Insights integration to capture function executions, dependencies, exceptions, performance metrics, and custom security events?",
    risk: "⚠️ Without serverless monitoring, function-level attacks or failures may go unnoticed."
  },
  {
    q: "For Azure Logic Apps, have you enabled diagnostics to log workflow runs, trigger events, action results, and integration failures?",
    risk: "⚠️ Without workflow logging, business process security incidents may not be detected."
  },
  {
    q: "Have you deployed Azure Monitor Agent to VMs to collect Security Event Logs, Syslog, performance counters, and custom log files?",
    risk: "⚠️ Without monitoring agents, VM-level security events may go unrecorded."
  },

  // Windows & Linux logs
  {
    q: "Have you configured Windows Event Log collection for security-relevant events including authentication, privilege escalation, account management, and audit policy changes?",
    risk: "⚠️ Without Windows security logging, attacks on endpoints may go undetected."
  },
  {
    q: "Have you configured Linux Syslog collection for authentication logs, system logs, and application-specific security logs?",
    risk: "⚠️ Without Linux logging, malicious or anomalous activities on Linux systems may go unnoticed."
  },
  {
    q: "Have you enabled antimalware monitoring for Windows VMs to log malware detection events, scan results, signature updates, and policy violations?",
    risk: "⚠️ Without endpoint protection monitoring, malware infections may remain undetected."
  },

  // Structured & application logging
  {
    q: "Have you implemented structured application logging with security context including user identity, source IP, request ID, operation type, data classification labels, authorization decisions, and business transaction identifiers?",
    risk: "⚠️ Without structured logging, correlation and forensic investigations may be ineffective."
  },
  {
    q: "Have you enabled Application Insights or equivalent APM telemetry to collect exceptions, custom security events, distributed tracing, and dependency tracking?",
    risk: "⚠️ Without APM telemetry, application security events may be missed and troubleshooting delayed."
  },
  {
    q: "Have you configured application-layer security event logging including authentication attempts, authorization failures, input validation failures, privilege escalations, sensitive data access, and business logic violations?",
    risk: "⚠️ Without application security logging, attacks or misconfigurations may go undetected."
  },
  {
    q: "For web applications and APIs, have you logged HTTP security headers, content security policy violations, CORS policy enforcement, and session management events to detect attacks?",
    risk: "⚠️ Without web app attack monitoring, application-layer threats may be missed."
  },
  {
    q: "Have you enabled logging for API gateways and WAFs to capture Layer 7 attacks including SQL injection, XSS, RCE, local file inclusion, XXE, and business logic abuse?",
    risk: "⚠️ Without Layer 7 attack logging, malicious activity may remain undetected."
  },
  {
    q: "Have you configured logging for rate limiting enforcement, authentication failures, bot detection, and API abuse patterns?",
    risk: "⚠️ Without API abuse logging, automated attacks and misuse may not be detected."
  },

  // Network logging
  {
    q: "Have you enabled NSG flow logs to capture information about IP traffic including source/destination IPs, ports, protocols, and allow/deny decisions?",
    risk: "⚠️ Without NSG flow logging, lateral movement or network-based attacks may go unnoticed."
  },
  {
    q: "Have you enabled Azure Firewall logs and metrics to monitor firewall activity, rule processing, threat intelligence hits, and DNS proxy logs?",
    risk: "⚠️ Without firewall logging, network threats may not be detected or investigated."
  },
  {
    q: "Have you enabled WAF logs to capture application-layer attack attempts including SQL injection, XSS, and OWASP Top 10 violations?",
    risk: "⚠️ Without WAF logging, application-layer threats may go undetected."
  },
  {
    q: "Have you collected DNS query logs to assist in correlating network data and detecting DNS-based attacks including tunneling, DGA domains, and C2 communications?",
    risk: "⚠️ Without DNS logging, malicious command-and-control traffic may go unnoticed."
  },
  {
    q: "Have you deployed Azure networking monitoring solutions in Azure Monitor for comprehensive network visibility and centralized log correlation?",
    risk: "⚠️ Without centralized network monitoring, threats spanning multiple network segments may be missed."
  },
  {
    q: "Have you sent flow logs to Azure Monitor Log Analytics and used Traffic Analytics to provide insights into traffic patterns, security threats, bandwidth consumption, and policy violations?",
    risk: "⚠️ Without traffic analytics, abnormal network activity and policy violations may go undetected."
  },

  // Log aggregation & SIEM
  {
    q: "Have you integrated Azure activity logs and resource diagnostic logs into a centralized Log Analytics workspace to enable cross-resource correlation and unified investigation workflows?",
    risk: "⚠️ Without centralized log aggregation, investigation and threat detection may be fragmented."
  },
  {
    q: "Do you use Azure Monitor with KQL queries to perform analytics on aggregated logs from Azure services, endpoints, network, and other security systems?",
    risk: "⚠️ Without query capability, patterns of malicious activity may be missed."
  },
  {
    q: "Have you created alert rules using aggregated logs to detect security threats and operational issues through correlation logic spanning multiple sources?",
    risk: "⚠️ Without alerting, incidents may remain unnoticed until they escalate."
  },
  {
    q: "Have you defined data ownership, role-based access controls, storage locations, and retention policies to meet compliance and investigation requirements?",
    risk: "⚠️ Without data governance, logs may be inaccessible, mismanaged, or non-compliant."
  },
  {
    q: "Have you onboarded Microsoft Sentinel to provide SIEM and SOAR capabilities for centralized security analysis and incident response?",
    risk: "⚠️ Without a SIEM platform, incident response and threat analysis may be delayed or incomplete."
  },
  {
    q: "Have you connected data sources to Microsoft Sentinel including Azure services, Microsoft 365, third-party solutions, and on-premises systems?",
    risk: "⚠️ Without comprehensive data sources, Sentinel may miss critical events or alerts."
  },
  {
    q: "Have you created detection rules in Sentinel to identify threats and automatically create incidents based on correlated security events?",
    risk: "⚠️ Without analytics rules, threats may not be detected or escalated automatically."
  },
  {
    q: "Have you implemented automated response playbooks using Logic Apps to orchestrate incident response actions including containment, notification, and remediation workflows?",
    risk: "⚠️ Without automated response, incidents may take longer to contain and remediate."
  },
  {
    q: "Have you deployed Sentinel workbooks and dashboards for security monitoring, threat hunting, compliance reporting, and executive-level visibility?",
    risk: "⚠️ Without monitoring dashboards, visibility into security posture may be limited."
  },
  {
    q: "Have you enabled Microsoft Security Copilot integration with Sentinel to provide AI-powered incident investigation, threat hunting, and guided response recommendations?",
    risk: "⚠️ Without AI-powered analysis, threat detection and investigation may be slower and less effective."
  },

  // Log storage & retention
  {
    q: "Have you created diagnostic settings to route Azure Activity Logs and resource logs to appropriate storage locations based on retention requirements and compliance mandates?",
    risk: "⚠️ Without proper log routing, retention and compliance requirements may not be met."
  },
  {
    q: "Do you use Azure Monitor Log Analytics workspace for short-to-medium term log retention (1–2 years) for investigation, threat hunting, and analytics?",
    risk: "⚠️ Without adequate retention, historical data may not be available for investigations."
  },
  {
    q: "Do you implement long-term archival storage using Azure Storage, Data Explorer, or Data Lake for compliance and cost-efficient retention?",
    risk: "⚠️ Without long-term archival, logs may be lost and compliance requirements may be violated."
  },
  {
    q: "Do you forward logs externally via Azure Event Hubs to SIEM, data lake, or third-party systems when needed?",
    risk: "⚠️ Without external forwarding, multi-cloud visibility or legacy integrations may be incomplete."
  },
  {
    q: "Have you configured retention policies for Azure Storage account logs including lifecycle management for automatic tier transitions and deletion?",
    risk: "⚠️ Without storage account retention, logs may be deleted prematurely, impacting investigations and compliance."
  },
  {
    q: "Have you implemented long-term storage strategy for Microsoft Sentinel logs including explicit archival configuration?",
    risk: "⚠️ Without proper Sentinel log retention, historical incidents may be inaccessible for audits or forensic analysis."
  },
  {
    q: "Do you continuously export Microsoft Defender for Cloud alerts and recommendations to meet retention requirements?",
    risk: "⚠️ Without alert export, historical alert data may be lost due to limited native retention."
  },

  // Time synchronization
  {
    q: "Do Azure Windows compute resources use Microsoft default NTP servers for time synchronization via virtualization integration services?",
    risk: "⚠️ Without correct time sync, log correlation and forensic analysis may be inaccurate."
  },
  {
    q: "Do Azure Linux compute resources use chrony or ntpd with Azure-provided or appropriate external NTP servers for time synchronization?",
    risk: "⚠️ Without correct Linux time sync, log timestamps may be inaccurate, affecting security investigations."
  },
  {
    q: "If deploying custom NTP servers, are UDP port 123 secured and access restricted to authorized clients only?",
    risk: "⚠️ Unsecured NTP servers can be exploited to manipulate time, affecting authentication and log integrity."
  },
  {
    q: "Do all logs generated by Azure resources include timestamps with time zone information (preferably UTC) to enable unambiguous timeline reconstruction?",
    risk: "⚠️ Without proper timestamp formats, reconstructing incident timelines may be unreliable."
  },
  {
    q: "Do you monitor time drift continuously across systems and configure alerts for significant synchronization issues (>5 seconds)?",
    risk: "⚠️ Without monitoring time drift, correlation of logs, forensic analysis, and time-based authentication may be affected."
  }
];
