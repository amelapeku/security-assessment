const questions = [
  // =========================
  // LT-1: Enable threat detection capabilities
  // =========================
  { type: "section", title: "LT-1: Enable threat detection capabilities" },

  { q: "Have you deployed cloud-native threat detection capabilities for compute, storage, database, and identity services, including behavioral analytics and threat intelligence-driven monitoring?", 
    risk: "⚠️ Without cloud-native threat detection, attacks on your cloud resources may go unnoticed and escalate." 
  },
  { q: "Have you enabled threat detection for all critical Azure services using Microsoft Defender for Cloud, covering virtual machines, storage accounts, databases, containers, and Key Vault instances?", 
    risk: "⚠️ Critical services without threat detection can be exploited without alerts, increasing security risk." 
  },
  { q: "Have your security teams reviewed available detection capabilities using the Microsoft Defender for Cloud security alerts reference guide, including alert types, severity levels, and response requirements?", 
    risk: "⚠️ Teams unaware of detection capabilities may not recognize alerts or respond appropriately." 
  },
  { q: "For services without native threat detection capability, are data plane logs collected and routed to Microsoft Sentinel for custom analytics rules and behavioral detection?", 
    risk: "⚠️ Without custom detection for unsupported services, malicious activity may go undetected." 
  },
  { q: "Have you configured alert filtering and analytics rules to reduce false positives and extract high-quality alerts from log data, tuning detection sensitivity based on workload criticality and risk tolerance?", 
    risk: "⚠️ Poorly tuned alerts generate noise or miss critical incidents, reducing monitoring effectiveness." 
  },

  // =========================
  // LT-2: Enable threat detection for identity and access management
  // =========================
  { type: "section", title: "LT-2: Enable threat detection for identity and access management" },

  { q: "Have you centralized security telemetry by aggregating alerts and log data from cloud security platforms, endpoint protection, identity systems, and application services into Azure Monitor or Microsoft Sentinel?", 
    risk: "⚠️ Without centralization, correlation and investigation of security events is difficult." 
  },
  { q: "Have you deployed Microsoft Defender XDR to correlate threat detection across Microsoft 365 Defender, Microsoft Defender for Cloud, and Microsoft Entra ID with automated investigation workflows?", 
    risk: "⚠️ Threats may remain undetected if cross-domain correlation is not implemented." 
  },
  { q: "Have you built custom analytics rules to detect organization-specific threat patterns that pre-built detections cannot address?", 
    risk: "⚠️ Missing custom rules can allow unique attack techniques to go unnoticed." 
  },
  { q: "Are Microsoft Defender Threat Intelligence feeds integrated to enrich alerts with threat actor attribution, infrastructure reputation, vulnerability exploitation intelligence, and compromised indicator correlation?", 
    risk: "⚠️ Alerts may lack context, reducing investigation efficiency and accuracy." 
  },
  { q: "Are threat intelligence indicators implemented in Microsoft Sentinel for automated matching against known malicious IPs, domains, hashes, and URLs?", 
    risk: "⚠️ Failing to leverage threat indicators increases the risk of delayed detection." 
  },

  // =========================
  // LT-3: Enable logging for security investigation
  // =========================
  { type: "section", title: "LT-3: Enable logging for security investigation" },

  { q: "Have you enabled comprehensive audit logging in Microsoft Entra to capture all changes to identity resources, including user/group management, role assignments, application registrations, and policy modifications?", 
    risk: "⚠️ Missing audit logs can prevent reconstruction of security incidents and compliance reporting." 
  },
  { q: "Are authentication activities monitored through sign-in reports to detect anomalies and establish baselines?", 
    risk: "⚠️ Suspicious sign-ins may go unnoticed, allowing prolonged adversary access." 
  },
  { q: "Are risky sign-in patterns, including impossible travel and credential leakage, detected and flagged for review?", 
    risk: "⚠️ Risky activities may remain undetected without proper monitoring." 
  },
  { q: "Are users flagged for risk monitored to detect compromised accounts requiring immediate remediation?", 
    risk: "⚠️ Compromised accounts can persist without automated or manual review." 
  },
  { q: "Are Microsoft Entra ID logs routed to SIEM platforms for advanced correlation, long-term retention, and cross-domain threat detection?", 
    risk: "⚠️ Lack of integration reduces forensic capability and cross-system visibility." 
  },

  // =========================
  // LT-4: Enable network logging for security investigation
  // =========================
  { type: "section", title: "LT-4: Enable network logging for security investigation" },

  { q: "Are network flow logs enabled for NSGs to monitor IP traffic, including source/destination, ports, protocols, and allow/deny decisions?", 
    risk: "⚠️ Without NSG flow logs, lateral movement attacks may go undetected." 
  },
  { q: "Are Azure Firewall logs and metrics enabled to monitor activity, rules processing, threat intelligence hits, and DNS proxy logs?", 
    risk: "⚠️ Firewall activity may be invisible, reducing incident detection capability." 
  },
  { q: "Are Web Application Firewall logs capturing application-layer attack attempts including SQL injection, XSS, and OWASP Top 10 violations?", 
    risk: "⚠️ Application-layer attacks may remain undetected without WAF logging." 
  },
  { q: "Are DNS query logs collected to detect tunneling, DGA domains, and command-and-control communications?", 
    risk: "⚠️ Missing DNS logs can allow attackers to evade detection." 
  },
  { q: "Are comprehensive network monitoring solutions deployed to provide centralized log correlation and traffic analytics?", 
    risk: "⚠️ Lack of centralized monitoring reduces threat visibility across network infrastructure." 
  },

  // =========================
  // LT-5: Centralize security log management and analysis
  // =========================
  { type: "section", title: "LT-5: Centralize security log management and analysis" },

  { q: "Are Azure activity logs and resource diagnostic logs integrated into a centralized Log Analytics workspace?", 
    risk: "⚠️ Without centralization, cross-resource correlation and investigation are difficult." 
  },
  { q: "Are KQL queries used to analyze aggregated logs from Azure services, endpoints, and networks for pattern detection?", 
    risk: "⚠️ Failure to query logs may allow threats to persist unnoticed." 
  },
  { q: "Are alerting rules configured using aggregated logs to detect security threats across multiple sources?", 
    risk: "⚠️ Lack of alerting reduces proactive threat detection." 
  },
  { q: "Are data ownership, role-based access, and retention policies defined for security logs?", 
    risk: "⚠️ Missing governance can cause compliance violations and investigation gaps." 
  },

  // =========================
  // LT-6: Configure log storage retention
  // =========================
  { type: "section", title: "LT-6: Configure log storage retention" },

  { q: "Are Azure Activity Logs and other resource logs routed to storage locations based on retention requirements and compliance mandates?", 
    risk: "⚠️ Incorrect retention can lead to missing historical data during investigations." 
  },
  { q: "Are short-to-medium term retention policies configured in Azure Monitor Log Analytics workspace for active investigation and threat hunting?", 
    risk: "⚠️ Without retention, operational and forensic analytics is limited." 
  },
  { q: "Is long-term archival storage configured using Azure Storage, Data Explorer, or Data Lake for compliance beyond 1-2 years?", 
    risk: "⚠️ Lack of archival storage can violate regulatory requirements." 
  },
  { q: "Are logs forwarded externally to SIEM, data lakes, or third-party security systems as needed?", 
    risk: "⚠️ Failing to forward logs can reduce multi-cloud visibility and response." 
  },

  // =========================
  // LT-7: Use approved time synchronization sources
  // =========================
  { type: "section", title: "LT-7: Use approved time synchronization sources" },

  { q: "Are Windows Azure compute resources synchronized using Microsoft default NTP servers?", 
    risk: "⚠️ Incorrect time can prevent accurate log correlation and forensic analysis." 
  },
  { q: "Are Linux Azure compute resources synchronized using chrony or ntpd with Azure-provided or approved NTP servers?", 
    risk: "⚠️ Time drift may impact authentication, logging, and incident timelines." 
  },
  { q: "Are custom NTP servers secured and restricted to authorized clients only?", 
    risk: "⚠️ Insecure NTP servers can be exploited for attacks or misalignment." 
  },
  { q: "Are log timestamps validated to include time zone information for unambiguous timeline reconstruction?", 
    risk: "⚠️ Missing timestamp data can prevent accurate incident reconstruction." 
  },
  { q: "Is continuous monitoring configured to alert on significant time drift (>5 seconds)?", 
    risk: "⚠️ Unmonitored time drift can compromise log integrity and correlation." 
  }
];
