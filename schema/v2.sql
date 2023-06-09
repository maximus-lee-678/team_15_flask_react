CREATE TABLE charger ( 
	id                   CHAR(36) NOT NULL  PRIMARY KEY  ,
	name                 VARCHAR(255) NOT NULL    ,
	latitude             DECIMAL(7) NOT NULL    ,
	longitude            DECIMAL(7) NOT NULL    ,
	address              VARCHAR(512) NOT NULL    ,
	provider             VARCHAR(64) NOT NULL    ,
	connectors           BIGINT NOT NULL    ,
	online               INT NOT NULL    ,
	kilowatts            BIGINT NOT NULL    ,
	twenty_four_hours    INT NOT NULL    ,       
	last_updated         DATETIME NOT NULL    
 );

CREATE TABLE user_info ( 
	id                   CHAR(36) NOT NULL  PRIMARY KEY  ,
	username             VARCHAR(64) NOT NULL    ,
	password             VARCHAR(64) NOT NULL    ,
	email                VARCHAR(255) NOT NULL    ,
	full_name            VARCHAR(255) NOT NULL    ,
	phone_no             VARCHAR(8)     ,
	created_at           DATETIME NOT NULL    ,
	modified_at          DATETIME NOT NULL    
 );

CREATE TABLE favourited_chargers ( 
	id                   CHAR(36) NOT NULL  PRIMARY KEY  ,
	id_user_info         CHAR(36) NOT NULL    ,
	id_charger           CHAR(36) NOT NULL    ,
	FOREIGN KEY ( id_user_info ) REFERENCES user_info( id )  ,
	FOREIGN KEY ( id_charger ) REFERENCES charger( id )  
 );

