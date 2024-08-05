namespace CRUD.Helper
{
    public class AppConstants
    {
        public static class ErrorMessages
        {
            
            public const string Error_In_Creation = "Error_In_Creation";
            public const string Internal_Server_Error = "Internal Server Error";
            public const string Error_User_With_Id_Exists = "User with User Id Already Exists";
            public const string Error_With_Id_Exists = "Record with Id Already Exists";
            public const string Error_With_DeptCode_Exists = "Record with department short code already Exists";
            public const string Error_With_DistCode_Exists = "Record with district code already Exists";
            public const string Error_In_Update = "Error_In_Update";
            public const string Error_System_Exception = "System Exception";
            public const string Error_In_Activation = "Could not activate as similar active data already exists";
            public const string Error_Duplicate_Email = "User with this mail id already exists";
            public const string Login_failed = "Login failed";
            public const string User_Not_Found = "User not found";
            public const string Password_No_match = "Please check the password";
            public const string Data_Not_Found = "Data not found";
            public const string Invalid_token = "Invalid token";
            public const string UnAuthenticated = "UnAuthenticated";
            public const string Unauthorized_Access = "Unauthorized Acess";
            public const string Validation_Failed = "Validation Failed";

            public const string Transaction_Not_Started = "Transaction_Not_Started";

            public const string No_valid_data_found_to_update = "No valid data found to update";
            public const string Record_not_found_to_update = "Record not found to update";
            public const string Record_Already_Exists = "Record already exists";
            public const string Incorrect_CAPTCHA = "Incorrect CAPTCHA!!! Enter valid letters shown in the image";
            public const string Bad_Request = "Bad Request";
        }

        public static class StatusMessages
        {
            public const string Post_Soft_Deleted = "Post is Soft Deleted";
            public const string Post_Deleted = "Post deleted ";
            public const string Post_Updated = "Post updated ";
            public const string Post_Added = "Post added ";
            public const string Got_Post = "Got post ";
            public const string Got_All_User = "Got all users ";


            public const string User_Updated = "User updated ";
            public const string User_Deleted = "User deleted ";
            public const string User_Added = "User added ";
            
            public const string User_Soft_Deleted = "User is Soft Deleted";
            public const string Permission_Created = "Permission is created by";
            public const string Permission_ApprovedForward = "Permission approved & forwarded to";
            public const string Permission_Approved = "Permission approved by ";
            public const string Permission_Forward = "Permission is forwarded to";
            public const string Permission_UO_Generated = "UO number is generated";
            public const string Permission_Rejected = "Permission is reject by";
            public const string Bank_Account_Entry = "Bank BankAccount Entry by";
            public const string AgenecyBARegistrationInitiate = "Agenecy Bank BankAccount Registration Iniitated By ";

            public const string Initiate = "Initiated By ";
            public const string Forward = "Forwarded To ";
            public const string Approve = "Approved By ";
            public const string RejectedBy = "Rejected By ";
            public const string RevertedBy = "Reverted By ";
            public const string UoGenerate = "UO Number Is Generated";
            public const string BankAccEntry = "Bank BankAccount Details Entry By ";
            public const string ApprovedAndSentForBankValidation = "Approved And Sent For Bank Validation";
            public const string ForwardedAndSentForBankValidation = "Forwarded And Sent For Bank Validation";
            public const string BankValidated = "Bank BankAccount Is Validated";

            public const string OBCInitiate = "Balance Capture Is Initiated";
            public const string OBCForward = "Balance Capture Forwarded To Approver";
            public const string OBCApprove = "Balance Capture Is Approved";

        }
    }
}
