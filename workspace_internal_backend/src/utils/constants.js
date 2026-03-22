const ACTIVE = true;
const INACTIVE = false;
const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const ERROR = "Internal server error";
const SUCCESS = "Success";
const BADREQUEST = "Bad Request";
const UNAUTHORIZED = "Unauthorized";
const FORBIDDEN = "Forbidden";
const NOTFOUND = "Not found";
const CREATED = "Created";
const NOCONTENT = "No content.";
const CHUNKSIZE = 50;
const EMAILCHUNKSIZE = 50;
const NOTSENT = "0";
const SENT = "1";
const CONFLICT = "Conflict";
const RESETPASSWORDURL = "https://caplead.co/forgotPassword";
const ADMIN = "SUPER ADMIN";
const HR = "HR";
const EMPLOYEE = "EMPLOYEE";
const FULLDAY = 7;
const WORKED_HOURS = 8;
const HALFDAY = 4.5;
const PT = 200;

// leave status
const PENDING = "pending";
const APPROVED = "approved";
const REJECTED = "rejected";
const CANCELLED = "cancelled"

// attendance status
const STATUS_PRESENT = "Present";
const STATUS_ABSENT = "Absent";
const STATUS_HALFDAY = "Half Day";
const STATUS_LEAVE = "Leave";
const STATUS_HOLIDAY = 'Holiday';
const STATUS_WEEKEND = 'Weekend';

// leave type
const FULL_LEAVE = "Full Day";
const HALF_LEAVE = "Half Day";

// employee conformation status;
const PERMANENT = "permanent";

// expected daily working hours
const DAILY_WORKING_HOURS = 8;

module.exports = {
  ACTIVE,
  INACTIVE,
  CHARACTERS,
  ERROR,
  SUCCESS,
  BADREQUEST,
  UNAUTHORIZED,
  NOTFOUND,
  FORBIDDEN,
  CREATED,
  NOCONTENT,
  CHUNKSIZE,
  SENT,
  NOTSENT,
  CONFLICT,
  EMAILCHUNKSIZE,
  RESETPASSWORDURL,
  ADMIN,
  HR,
  EMPLOYEE,
  PENDING,
  APPROVED,
  REJECTED,
  CANCELLED,
  FULLDAY,
  HALFDAY,
  PT,
  STATUS_PRESENT,
  STATUS_ABSENT,
  STATUS_HALFDAY,
  PERMANENT,
  WORKED_HOURS,
  STATUS_LEAVE,
  STATUS_HOLIDAY,
  STATUS_WEEKEND,
  FULL_LEAVE,
  HALF_LEAVE,
  DAILY_WORKING_HOURS
};
