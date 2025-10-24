CREATE TABLE `education` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`institution` varchar(255) NOT NULL,
	`degree` varchar(255) NOT NULL,
	`field` varchar(255),
	`startDate` varchar(50),
	`endDate` varchar(50),
	`sortOrder` varchar(10) DEFAULT '0',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `education_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`company` varchar(255) NOT NULL,
	`position` varchar(255) NOT NULL,
	`description` text,
	`startDate` varchar(50),
	`endDate` varchar(50),
	`current` enum('yes','no') NOT NULL DEFAULT 'no',
	`sortOrder` varchar(10) DEFAULT '0',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `experiences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`fullName` varchar(255),
	`title` varchar(255),
	`bio` text,
	`location` varchar(255),
	`profileImageUrl` text,
	`email` varchar(320),
	`linkedin` varchar(500),
	`behance` varchar(500),
	`website` varchar(500),
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profile_id` PRIMARY KEY(`id`),
	CONSTRAINT `profile_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`imageUrl` text,
	`tags` text,
	`category` varchar(100),
	`featured` enum('yes','no') NOT NULL DEFAULT 'no',
	`sortOrder` varchar(10) DEFAULT '0',
	`userId` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`name` varchar(100) NOT NULL,
	`category` varchar(100),
	`sortOrder` varchar(10) DEFAULT '0',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `skills_id` PRIMARY KEY(`id`)
);
