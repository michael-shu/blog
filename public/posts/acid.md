---
title: "ACID vs BASE Databases"
date: "08/12/2025"
slug: "acid-vs-base"
length: "6 min"
image: "acid/acid.png"
tags: "databases, sql, nosql, acid, base"
---

## Understanding ACID and BASE Databases
If you’ve worked with databases, you’ve probably run into the acronyms ACID and BASE.
If you haven't, this article will hopefully elucidate their meaning.
They’re not chemistry here—they’re two different ways databases handle transactions.

Before we get into the differences, let’s define a transaction.
A transaction is a single unit of work in a database.

Typically, these operations are CRUD in nature:

Create – Insert new data into the database.
Example: Adding a new user record when someone signs up.

Read – Retrieve existing data.
Example: Fetching a customer’s order history.

Update – Modify existing data.
Example: Changing a shipping address on an order before it’s shipped.

Delete – Remove existing data.
Example: Deleting an expired session token.

In a transaction, these operations are grouped so they either:

All succeed together (ACID approach), or

May partially succeed with eventual correction (BASE approach).

The “unit of work” could be as small as a single INSERT or as big as several INSERT, UPDATE, and DELETE statements touching multiple tables. The key is that the database treats it as one logical action from start to finish.
For example:
Transferring money from your bank account to someone else’s—either the money leaves your account and appears in theirs, or the whole thing is rolled back.

## 🔍 ACID — Reliability First
ACID stands for Atomicity, Consistency, Isolation, Durability.
It’s all about data consistency and reliability, even if that means sacrificing availability when something goes wrong.

### A - Atomicity

All-or-nothing. If any part fails, the entire transaction rolls back.

Example: When you send money with Venmo, the transaction has two parts:

1. Subtracting the amount from Account A.
2. Adding the amount to Account B.

If one part succeeds but the other fails, you either lose money or create money that didn’t exist — breaking the integrity of the system. So, atomicity is the standard to prevent the entire transaction from completing. 

### C - Consistency

Data always follows the rules of the system.

Example: Lets say the capacity of a venue is 600 people. So each time we sell a ticket, we have to check that the current number of tickets sold isn't above 600. This is an example of a rule determined by the system.

So, to monitor this we store the number of tickets sold in a dastabase. That number must be an integer. So if a transaction ever updated that number to be a float or double, that would violate the rule. The transaction would be terminated and the affected rows rolled back.

### I – Isolation

Transactions don’t interfere with each other while they’re running.

Example: If two transactions are changing one persons bank balance, and they happen at the same time, you could end  up with a race condition. Lets say both transactions are set to subtract 50 from the balance.

If the two aren't sequential, it can lead to a race condition where both write the same value to the balance, meaning only 50 is subtracted instead of 100. 

In ACID systems, isolation ensures a consistent view of the data by controlling how transactions overlap:

* **Optimistic isolation** assumes conflicts are rare, allowing transactions to proceed in parallel. If two transactions touch the same data, they’re rolled back and retried.
* **Pessimistic isolation** assumes conflicts are likely, locking data so only one transaction can use it at a time. This reduces rollbacks but can slow things down.

Most systems aim for a balance — enough isolation to protect data integrity without unnecessarily blocking work. What you choose depends on how often transactions will touch the same data. 

### D - Durability

Once a transaction is committed, it’s permanent.

There are three levels upon which durability has to be ensured.

1. Transactional level - Database durability in case of a faulty transaction is already guaranteed by atomicity. 

2. System level - A system failure is defined as the contents of volatile storage being lost. What this means in practice is that the environment that is running the database crashes suddenly. This could be caused by a power outage, an operating system crash, or similar events.

In this case, the go to option is to have a log of committed and non-committed transactions stored in non-volatile memory that is continually added to, before the pending transaction is committed. So, in case of system failure, committed transactions can be redone from the log, while non-committed ones can be undone without affecting the state of the database. 

3. Media level - This level of system failure is defined as contents of non-volatile storage being lost. Either through corruption of files, physical damage(fire, water), or similar events. Durability onn this level is achieved by through a variety of backup/data loss prevention techniques such as having backups of databases in separate locations(cloud geo-redundancy) or point-in-time-recovery(PITR). 

## 🔍 BASE — Availability First
BASE stands for Basically Available, Soft state, Eventually consistent.
It exchanges accuracy for high availability and scalability.

### Basically Available
 
The system stays up and responsive, even if data isn’t perfectly up-to-date. 

For example, an ecommerce website prioritizes taking in and procesing orders during high traffic, so exact inventory updates lag behind.

### Soft State

Data can change over time, even without new input, while updates sync.

Example: If you delete/edit an instagram post, people who have loaded it will still have it the original on their feed until the cache expires or the user refreshes the app. 

### Eventually Consistent

The system guarantees consistency over time, not instantly.

Example: Imagine a groupchat where some members have received a new message, but some haven't, typically due to connection issues. Over time, the system delivers the message to everyone, resolving these discrepancies so that all participants have a consistent view of the conversation.

## 🧠 The CAP Theorem Connection
In distributed databases, the CAP theorem says you can only have two out of three:

Consistency (everyone sees the same data right away)

Availability (system always responds)

Partition Tolerance (system keeps running if nodes can’t talk to each other)

Both ACID and BASE systems are partition tolerant (must be for distributed systems),
so you’re basically choosing between Consistency (ACID) and Availability (BASE). 

## 💡 When to Use Which
- **Use ACID when:**

Accuracy is critical.

Examples: financial transactions, stock trading, healthcare data.

- **Use BASE when:**

Availability and speed matter more than perfect real-time accuracy.

Examples: social media feeds, group chats, like/upvote counts.

## 📌 Takeaways

- **ACID** = Correctness first, slower scaling, stronger guarantees.

- **BASE** = Speed and uptime first, more tolerant of temporary inconsistencies.

Neither is “better” universally—it depends on what failure your system can live with.