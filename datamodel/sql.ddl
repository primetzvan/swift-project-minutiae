-- Generiert von Oracle SQL Developer Data Modeler 20.2.0.167.1538
--   am/um:        2021-04-28 11:18:24 MESZ
--   Site:      Oracle Database 11g
--   Typ:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE accesstable (
    startdate         DATE,
    enddate           DATE,
    usertable_userid  NUMBER NOT NULL,
    doortable_doorid  NUMBER NOT NULL
);

ALTER TABLE accesstable ADD CONSTRAINT accesstable_pk PRIMARY KEY ( usertable_userid,
                                                                    doortable_doorid );

CREATE TABLE doortable (
    doorid  NUMBER NOT NULL,
    name    VARCHAR2(255),
    ip      VARCHAR2(255)
);

ALTER TABLE doortable ADD CONSTRAINT doortable_pk PRIMARY KEY ( doorid );

CREATE TABLE finger (
    finger   VARCHAR2(255) NOT NULL,
    user_id  NUMBER NOT NULL,
    binfile  VARCHAR2(255)
);

ALTER TABLE finger ADD CONSTRAINT finger_pk PRIMARY KEY ( finger );

CREATE TABLE logaccesstable (
    time              DATE,
    usertable_userid  NUMBER NOT NULL,
    doortable_doorid  NUMBER NOT NULL
);

ALTER TABLE logaccesstable ADD CONSTRAINT logaccesstable_pk PRIMARY KEY ( usertable_userid,
                                                                          doortable_doorid );

CREATE TABLE usertable (
    userid     NUMBER NOT NULL,
    firstname  VARCHAR2(255),
    lastname   VARCHAR2(255),
    email      VARCHAR2(255),
    role       VARCHAR2(255)
);

ALTER TABLE usertable ADD CONSTRAINT user_pk PRIMARY KEY ( userid );

ALTER TABLE accesstable
    ADD CONSTRAINT accesstable_doortable_fk FOREIGN KEY ( doortable_doorid )
        REFERENCES doortable ( doorid );

ALTER TABLE accesstable
    ADD CONSTRAINT accesstable_usertable_fk FOREIGN KEY ( usertable_userid )
        REFERENCES usertable ( userid );

ALTER TABLE logaccesstable
    ADD CONSTRAINT logaccesstable_doortable_fk FOREIGN KEY ( doortable_doorid )
        REFERENCES doortable ( doorid );

ALTER TABLE logaccesstable
    ADD CONSTRAINT logaccesstable_usertable_fk FOREIGN KEY ( usertable_userid )
        REFERENCES usertable ( userid );

ALTER TABLE finger
    ADD CONSTRAINT userid_fk FOREIGN KEY ( user_id )
        REFERENCES usertable ( userid );



-- Zusammenfassungsbericht für Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             5
-- CREATE INDEX                             0
-- ALTER TABLE                             10
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
