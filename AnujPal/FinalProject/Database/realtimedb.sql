SELECT * FROM AccountDeatils
SELECT * FROM ATM
SELECT * FROM BranchTable
SELECT * FROM Credit
SELECT * FROM CustomerTable
SELECT * FROM Debit
SELECT * FROM NetBanking





/*A view to see latest 3 Debit */

CREATE VIEW Latest_3_Debit
AS

SELECT TOP 3 * FROM Debit
Go

/*A view to see latest 3 Credit */

CREATE VIEW Latest_3_Credit
AS

SELECT TOP 3 * FROM Credit
Go

SELECT * FROM Latest_3_Credit

ALTER TABLE AccountDeatils
ADD Balance INT


/*Procedure For The SHow Balance in Account*/

CREATE PROCEDURE Balance
@AccNo INT
AS
SELECT Balance FROM AccountDeatils WHERE AccNo=@AccNo


DECLARE @AccNo INT
SET @AccNo=101
EXEC Balance 101


/*A Trigger For Reflect the debit in actual balance in the Account Details */

CREATE OR ALTER TRIGGER ForDebit
ON Debit
 AFTER INSERT
AS
BEGIN
DECLARE @Debit INT,@AccNo INT
SELECT @Debit=Amount ,@AccNo=AccNo FROM inserted
UPDATE AccountDeatils
SET Balance=balance-@Debit WHERE AccNo=@AccNo
END


/*A Trigger For Reflect the debit in actual balance in the Account Details */

CREATE OR ALTER TRIGGER ForCredit
ON Credit
 AFTER INSERT
AS
BEGIN
DECLARE @Credit INT,@AccNo INT
SELECT @Credit=Amount ,@AccNo=AccNo FROM inserted
UPDATE AccountDeatils
SET Balance=balance+@Credit WHERE AccNo=@AccNo
END



SELECT * FROM AccountDeatils
SELECT * FROM Credit
