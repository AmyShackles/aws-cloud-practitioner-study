const quizzes = [
  {
    question:
      "Availability Zones within a Region are connected over low-latency links. Which of the following is a benefit of these links?",
    options: [
      "Make synchronous replication of your data possible",
      "Create private connections to your data center",
      "Achieve global high availability",
      "Automate the process of provisioning new compute resources",
    ],
    answer: "Make synchronous replication of your data possible",
  },
  {
    question:
      "What does Amazon CloudFront use to distribute content to global users with low latency?",
    options: [
      "AWS Global Accelerator",
      "AWS Edge Locations",
      "AWS Regions",
      "AWS Data Centers",
    ],
    answer: "AWS Edge Locations",
  },
  {
    question:
      "A company has developed an eCommerce web application in AWS. What should they do to ensure that the application has the highest level of availability?",
    options: [
      "Deploy the application across multiple Availability Zones and Edge locations",
      "Deploy the application across multiple VPCs and subnets",
      "Deploy the application across multiple Regions and Availability Zones",
      "Deploy the application across multiple Availability Zones and subnets",
    ],
    answer:
      "Deploy the application across multiple Regions and Availability Zones",
  },
  {
    question:
      "What is the AWS database service that allows you to upload data structured in key-value format?",
    options: [
      "Amazon Redshift",
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon Aurora",
    ],
    answer: "Amazon DynamoDB",
  },
  {
    question:
      "Which of the following does NOT belong to the AWS Cloud Computing models?",
    options: [
      "Software as a Service (SaaS)",
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Networking as a Service (NaaS)",
    ],
    answer: "Networking as a Service (NaaS)",
  },
];

export { quizzes };
