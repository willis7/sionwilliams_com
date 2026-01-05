---
title: "The Art of Monitoring"
date: 2019-06-28T10:02:44Z
draft: false
toc: false
images:
tags:
   - leadership
   - highlights
---

[The Art of Monitoring](https://amzn.to/35i4fN9)
By James Turnbull and Sid Orlando

> The stages are: Manual, user-initiated, or no monitoring Reactive Proactive
                

> Checks will also focus on measuring application performance and business outcomes rather than just stock concerns like disk and CPU.

> Monitoring will still largely be managed by an operations team, but responsibility for ensuring new applications and services are monitored may be delegated to application developers. Products will not be considered feature complete or ready for deployment without monitoring.             

> As a result, non-operations staff are disconnected from the reality of the performance and availability of the infrastructure and applications being monitored.             

> If a metric is measuring then the service is available. If it stops measuring then it's likely the service is not available.             

> Orienting your focus toward availability, rather than quality and service, treats IT assets as pure capital and operational expenditure. They aren't assets that deliver value, they are just assets that need to be managed. Organizations that view IT as a cost center tend to be happy to limit or cut budgets, outsource services, and not invest in new programs because they only see cost and not value.             

> Additionally, through anomaly detection and pattern analysis, metrics have the potential to identify faults or issues before they occur or before the specific system event that indicates an outage is generated.             

> To build a good notification system you need to consider the basics of: Who to tell about a problem. How to tell them. How often to tell them. When to stop telling them, do something else, or escalate to someone else.             

> Humans tend towards apophenia—the perception of meaningful patterns within random data—when viewing visualizations.             

> Bill Baker, a former Distinguished Engineer at Microsoft, once quipped that hosts are either pets or cattle. Pets have sweet names like Fido and Boots. They are lovingly raised and looked after. If something goes wrong with them you take them to the vet and nurse them back to health. Cattle have numbers. They are raised in herds and are basically identical. If something goes wrong with one of them, you put it down and replace it with another.             

> If a metric is measuring, an event is reporting, or a log is spooling, then the service is available. If it stops measuring or reporting then it's likely the service is not available.             

> If you're instrumenting an existing application then make a priority-driven list of specific pages or endpoints and instrument them in order of importance.             

> Measure and log all calls to external services and APIs, such as if your application uses a database, cache, or search service, or if it uses third-party services like a payments gateway.             

> Measure and log job scheduling, execution, and other periodic events like cron jobs             

> Measure significant business and functional events, such as users being created or transactions like payments and sales.             

> Measure methods and functions that read and write from databases and caches.             

> You should ensure your events have timestamps. If you create events and metrics that contain timestamps, please use standards. For example, the ISO8601 standard provides dates and timestamps that are parseable by many tools.             

> A good example of how to measure application throughput is Brendan Gregg's USE Method.             

> The engineers who manage the Tornado application have built their concerns from the business owner's priorities: That the Tornado application is available, and that they are notified when the Tornado application is not available. That at least one Tornado web servers is available as much as possible. That there is a 5xx error rate less than 1% on the Tornado web servers. That the Tornado application 99th-percentile latency is 100 milliseconds or less. that 99th-percentile latency adding items to the Tornado DB is 3 milliseconds or less.
