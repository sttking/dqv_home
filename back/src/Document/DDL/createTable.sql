CREATE TABLE `contact_history` (
                                   `seq` int(11) NOT NULL AUTO_INCREMENT,
                                   `name` varchar(10) NOT NULL DEFAULT '',
                                   `email` varchar(100) NOT NULL DEFAULT '',
                                   `phone` varchar(20) NOT NULL DEFAULT '',
                                   `company_name` varchar(50) NOT NULL DEFAULT '',
                                   `department` varchar(20) DEFAULT '',
                                   `privacy_agreement` varchar(2) NOT NULL DEFAULT '',
                                   `marketing_agreement` varchar(2) DEFAULT 'N',
                                   `contact_type` varchar(20) NOT NULL DEFAULT '',
                                   `reg_dt_tm` datetime DEFAULT current_timestamp(),
                                   `mail_send_yn` varchar(2) DEFAULT 'N',
                                   PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COMMENT='문의내역';

-- homepage.homepage_news definition

CREATE TABLE `homepage_news` (
                                 `news_id` int(11) NOT NULL AUTO_INCREMENT,
                                 `news_writer` varchar(50) NOT NULL,
                                 `news_title` varchar(500) DEFAULT NULL,
                                 `news_url` varchar(500) NOT NULL,
                                 `reg_dt` datetime NOT NULL,
                                 `hash_tags` varchar(100) DEFAULT NULL,
                                 `img_url` varchar(200) DEFAULT NULL,
                                 `use_yn` varchar(2) DEFAULT 'Y',
                                 `news_type` varchar(2) NOT NULL,
                                 PRIMARY KEY (`news_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

ALTER TABLE homepage_news
    ADD COLUMN news_body MEDIUMTEXT NULL;