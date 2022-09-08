<h1>Relational Schemas</h1>


Person(<ins>Email</ins>, First_Name, Last_Name)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;First_Name - String\
&emsp;&emsp;&emsp;Last_Name - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;First_Name - a string of characters ranging in length from 1 - 30 characters\
&emsp;&emsp;&emsp;Last_Name - a string of characters ranging in length from 1 - 30 characters\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:** N/A



---
Student(<ins>Email</ins>, V_Number)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;V_Number - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;V_Number - a string starting with V00 followed by six numeric characters, each in the range [0-9]\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Student.Email references Person.Email



---
TA(<ins>Email</ins>, V_Number, TA_ID)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;V_Number - String\
&emsp;&emsp;&emsp;TA_ID - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;V_Number - a string starting with V00 followed by six numeric characters, each in the range [0-9]\
&emsp;&emsp;&emsp;TA_ID - a string which contains 6 numeric character, each in the range [0-9] \
&emsp;**Constraints:** N/A\
&emsp;**Foreign Keys:** \
&emsp;&emsp;&emsp;TA.Email references Person.Email, \
&emsp;TA.V_Number references Student.V_Number




---
Professor(<ins>Email</ins>, Professor_ID)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;Professor_ID - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;Professor_ID - a string which contains 6 numeric character, each in the range [0-9] \
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Professor.Email references Person.Email



---
Event(<ins>Email</ins>, <ins>Start_Time</ins>, <ins>End_Time</ins>, <ins>Date</ins>, Task)\
&emsp;**Types:** \
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;Start_Time - Time\
&emsp;&emsp;&emsp;End_Time - Time\
&emsp;&emsp;&emsp;Date - Date\
&emsp;&emsp;&emsp;Task - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp;End_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp;Date - a date in the following format: \
&emsp;&emsp;&emsp;&emsp;&emsp;YYYY-MM-DD where YYYY corresponds to 4 numeric characters ranging from [0-9] for the year, \
&emsp;&emsp;&emsp;&emsp;&emsp;MM corresponds to 2 numeric characters ranging from [0-9] for the month, and 2 numeric characters ranging from [0-9] for the day.\
&emsp;&emsp;&emsp;Task - a string\
&emsp;**Constraint:** \
&emsp;&emsp;&emsp;You can not double book yourself when two events have the same start and end time, \
&emsp;&emsp;&emsp;&emsp;&emsp;but if there's a different start or end time it is okay since technically you can catch \
&emsp;&emsp;&emsp;&emsp;&emsp;a portion of it. The task describes the item the person is working on.\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Event.Email references Person.Email



---
Course(<ins>Course_ID</ins>, Title)\
&emsp;**Types:** 
&emsp;&emsp;&emsp;Course_ID - String\
&emsp;&emsp;&emsp;Title - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Course_ID - a string with 4 leading characters corresponding to the department code, followed by 3 \
&emsp;&emsp;&emsp;&emsp;&emsp;numeric characters, each ranging from [0-9]\
&emsp;&emsp;&emsp;Title - a string of characters\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:** N/A




---
Section(<ins>Course_ID</ins>, <ins>Section_ID</ins>, <ins>Semester</ins>, <ins>Year</ins>, Start_Time, End_Time, Day)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Course_ID - String\
&emsp;&emsp;&emsp;Section_ID - String\
&emsp;&emsp;&emsp;Semester - String\
&emsp;&emsp;&emsp;Year - Integer\
&emsp;&emsp;&emsp;Start_Time - Time\
&emsp;&emsp;&emsp;End_Time - Time\
&emsp;&emsp;&emsp;Day - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Course_ID - a string with 4 leading characters corresponding to the department code, followed by 3 numeric characters, \
&emsp;&emsp;&emsp;&emsp;&emsp;each ranging from [0-9]\
&emsp;&emsp;&emsp;Section_ID - a string of 3 numeric characters ranging from [0-9]\
&emsp;&emsp;&emsp;Semester - a string either Fall or Spring\
&emsp;&emsp;&emsp;Year - anything in the range from 1996 until 2021 (max year is updated every single year)\
&emsp;&emsp;&emsp;Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp;End_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp;Day - a string composed of one of the following characters U, M, T, W, R, F, S where they correspond to the \
&emsp;&emsp;&emsp;&emsp;&emsp;following days: U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:** \
&emsp;&emsp;&emsp;Section.Course_ID references Course.Course_ID




---
Assignment(<ins>Assignment_ID</ins>, Name, Due_Date, Time, Description)\
&emsp;**Types:** \
&emsp;&emsp;&emsp;Assignment_ID - String\
&emsp;&emsp;&emsp;           Name - String\
&emsp;&emsp;&emsp;           Due_Date - Date\
&emsp;&emsp;&emsp;	Time - Time\
&emsp;&emsp;&emsp;           Description - String

&emsp;**Domain:** \
&emsp;&emsp;&emsp;Assignment_ID - a string of seven numeric characters\
 &emsp;&emsp;&emsp;             Name - a string of characters\
 &emsp;&emsp;&emsp;             Due_Date - a date in the following format: YYYY-MM-DD where YYYY corresponds \
 &emsp;&emsp;&emsp;&emsp;&emsp;to 4 numeric characters ranging from [0-9] for the year, MM corresponds to 2 numeric characters \
 &emsp;&emsp;&emsp;&emsp;&emsp;ranging from [0-9] for the month, and 2 numeric characters ranging from [0-9] for the day. \
&emsp;&emsp;&emsp;	   Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
 &emsp;&emsp;&emsp;             Description - a string of characters\
&emsp;**Constraints:**\
&emsp;&emsp;&emsp;Every assignment entered always receives a unique assignment id. The assignment description includes a description/title of the assignment.\
&emsp;**Foreign Key:** N/A




---
Study Session(<ins>Date</ins>, <ins>Location</ins>, <ins>Start_Time</ins>, End_Time, Course_Name, Mode)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Date - Date\
&emsp;&emsp;&emsp;  Location - String\
&emsp;&emsp;&emsp; Start_Time - Time\
&emsp;&emsp;&emsp;End_Time - Time\
&emsp;&emsp;&emsp; Course_Name - String\
&emsp;&emsp;&emsp; Mode - String 

&emsp;**Domain:** \
&emsp;&emsp;&emsp;Date - a string in the following format: YYYY-MM-DD where YYYY corresponds\
&emsp;&emsp;&emsp;&emsp;&emsp;to 4 numeric characters ranging from [0-9] for the year, MM corresponds to 2 numeric characters\
&emsp;&emsp;&emsp;&emsp;&emsp;ranging from [0-9] for the month, and 2 numeric characters ranging from [0-9] for the day.\
&emsp;&emsp;&emsp;Location - a string of characters\
&emsp;&emsp;&emsp;  Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59\
&emsp;&emsp;&emsp;  End_Time - a time in the format XX:XX ranging from 00:00 to 23:59\
&emsp;&emsp;&emsp;Course_Name - a string representing the name of the course\
&emsp;&emsp;&emsp;Mode - one of the following strings: Online or InPerson\
&emsp;**Constraints:** \
&emsp;&emsp;&emsp;The location is either a zoom link or a location in the format - Building-Room#\
&emsp;**Foreign Key:** N/A


---
Office Hours(<ins>Day</ins>, <ins>Start_Time</ins>, <ins>Location</ins>, End_Time, Mode)\
&emsp;**Type:**\
&emsp;&emsp;&emsp;Day - String\
&emsp;&emsp;&emsp;          Location - String\
&emsp;&emsp;&emsp;          Start_Time - Time\
&emsp;&emsp;&emsp;          End_Time - Time\
&emsp;&emsp;&emsp;          Mode - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Day - a string composed of one of the following characters U, M, T, W, R, F, S where they correspond \
&emsp;&emsp;&emsp;&emsp;&emsp;to the following days: U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday\
&emsp;&emsp;&emsp;Location - a string of characters\
&emsp;&emsp;&emsp;Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp;End_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp; Mode - one of the following strings: Online or InPerson\
&emsp;**Constraints:** \
&emsp;&emsp;&emsp;The location is either a zoom link or a location in the format - Building-Room#\
&emsp;**Foreign Key:** N/A



---
Takes(<ins>Course_ID</ins>, <ins>Email</ins>, Semester, Year, Email, Grade)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Course_ID - String \
&emsp;&emsp;&emsp;Section_ID - String \
&emsp;&emsp;&emsp;Semester - String \
&emsp;&emsp;&emsp;Year - String \
&emsp;&emsp;&emsp;            Email - String\
&emsp;&emsp;&emsp;	Grade - Float

&emsp;**Domain:** \
&emsp;&emsp;&emsp;Course_ID - a string with 4 leading characters corresponding to the department code, followed by 3 numeric\
&emsp;&emsp;&emsp;&emsp;&emsp;characters, each ranging from [0-9]\
&emsp;&emsp;&emsp;Section_ID - a string of 3 numeric characters ranging from [0-9]\
&emsp;&emsp;&emsp;Semester - a string either Fall or Spring\
&emsp;&emsp;&emsp;Year - anything in the range from 1996 until 2021 (max year is updated every single year)\
&emsp;&emsp;&emsp;              Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;	  Grade - a singular character from one of the following: A, B, C, D, F, I, W\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Takes.Course_ID references Course.Course_ID, \
&emsp;&emsp;&emsp;Takes.Section_ID references Section.Section_ID, \
&emsp;&emsp;&emsp;Takes.Semester references Section.Semester, \
&emsp;&emsp;&emsp;Takes.Year references Section.Year, \
&emsp;&emsp;&emsp;Takes.Email references Person.Email



---
TAS_For(<ins>Course_ID</ins>, <ins>Section_ID</ins>, <ins>Semester</ins>, <ins>Year</ins>, Email)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Course_ID - String\
&emsp;&emsp;&emsp;Section_ID - String\
&emsp;&emsp;&emsp;Semester - String\
&emsp;&emsp;&emsp;Year - Integer\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu

&emsp;**Domain:** \
&emsp;&emsp;&emsp;Course_ID - Course_ID - a string with 4 leading characters corresponding to the department code, \
&emsp;&emsp;&emsp;&emsp;&emsp;followed by 3 numeric characters, each ranging from [0-9]\
&emsp;&emsp;&emsp;Section_ID - a string of 3 numeric characters ranging from [0-9]\
&emsp;&emsp;&emsp;Semester - a string either Fall or Spring\
&emsp;&emsp;&emsp;Year - anything in the range from 1996 until 2021 (max year is updated every single year)\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:** \
&emsp;&emsp;&emsp;TAS_For.Course_ID, \
&emsp;&emsp;&emsp;TAS_For.Section_ID, TAS_For.Semester, \
&emsp;&emsp;&emsp;TAS_For.Year, TAS_For.Email



---
Works_On(<ins>Email</ins>, <ins>Assignment_ID</ins>)\
&emsp;**Types:** Email - String\
 	&emsp;&emsp;&emsp;Assignment_ID - String\
&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
 	   &emsp;&emsp;&emsp;Assignment_ID - a string of seven numeric characters\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Works_On.Email references Person.Email, \
&emsp;&emsp;&emsp;Works_On.Assignment_ID references Assignment.Assignment_ID



---
Course_Section(<ins>Course_ID</ins>, <ins>Section_ID</ins>, <ins>Semester</ins>, <ins>Year</ins>)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Course_ID - String\
&emsp;&emsp;&emsp;            Section_ID - String\
&emsp;&emsp;&emsp;            Semester - String\
&emsp;&emsp;&emsp;            Year - Integer

&emsp;**Domain:** \
&emsp;&emsp;&emsp;Course_ID - a string with 4 leading characters corresponding to the department code, followed by 3 numeric\
&emsp;&emsp;&emsp;&emsp;&emsp;characters, each ranging from [0-9]\
&emsp;&emsp;&emsp;               Section_ID - a string of 3 numeric characters ranging from [0-9]\
&emsp;&emsp;&emsp;               Semester - a string either Fall or Spring\
&emsp;&emsp;&emsp;               Year -  anything in the range from 1996 until 2021 (max year is updated every single year)\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Course_Section.Course_ID references Course.Course_ID, \
&emsp;&emsp;&emsp;Course_Section.Section_ID references Section.Section_ID,\
&emsp;&emsp;&emsp;Course_Section.Semester references Section.Semester,\
&emsp;&emsp;&emsp;Course_Section.Year references Section.Year



---
Schedule(<ins>Email</ins>, <ins>Start_Time</ins>, <ins>End_Time</ins>, <ins>Date</ins>)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;            Start_Time - Time\
&emsp;&emsp;&emsp;            End_Time - Time\
&emsp;&emsp;&emsp;            Date - Date

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp; End_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp;Date - a date in the following format: YYYY-MM-DD where YYYY corresponds to 4 numeric characters ranging \
&emsp;&emsp;&emsp;&emsp;&emsp;from [0-9] for the year, MM corresponds to 2 numeric characters ranging from [0-9] for the month, \
&emsp;&emsp;&emsp;&emsp;&emsp;and 2 numeric characters ranging from [0-9] for the day. \
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Schedule.Email references Person.Email, \
&emsp;&emsp;&emsp;Schedule.Start_Time references Event.Start_Time,\
&emsp;&emsp;&emsp;Schedule.End_Time references Event.End_Time, \
&emsp;&emsp;&emsp;Schedule.Date references Event.Date



---
Teaches(<ins>Course_ID</ins>, <ins>Section_ID</ins>, <ins>Semester</ins>, <ins>Year</ins>, Email)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Course_ID - String\
&emsp;&emsp;&emsp;            Section_ID - String\
&emsp;&emsp;&emsp;            Semester - String\
&emsp;&emsp;&emsp;	Year - Integer\
&emsp;&emsp;&emsp;	Email - String

&emsp;**Domain:** \
&emsp;&emsp;&emsp;Course_ID - a string with 4 leading characters corresponding to the department code, followed by 3 numeric\
&emsp;&emsp;&emsp;&emsp;&emsp;characters, each ranging from [0-9]\
&emsp;&emsp;&emsp;               Section_ID - a string of 3 numeric characters ranging from [0-9]\
&emsp;&emsp;&emsp;               Semester - a string either Fall or Spring\
&emsp;&emsp;&emsp;               Year - anything in the range from 1996 until 2021 (max year is updated every single year)\
&emsp;&emsp;&emsp;	   Email -  a string of characters followed by @vcu.edu\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Teaches.Course_ID references Course.Course_ID, \
&emsp;&emsp;&emsp;Teaches.Section_ID references Section.Section_ID, \
&emsp;&emsp;&emsp;Teaches.Semester references Section.Semester, \
&emsp;&emsp;&emsp;Teaches.Year references Section.Year, \
&emsp;&emsp;&emsp;Teaches.Email references Person.Email



---
Assigns(<ins>Assignment_ID</ins>, Course_ID, Section_ID, Semester, Year)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Assignment_ID - String\
&emsp;&emsp;&emsp;            Course_ID - String\
&emsp;&emsp;&emsp;            Section_ID - String\
&emsp;&emsp;&emsp;            Semester - String\
&emsp;&emsp;&emsp;            Year - Integer

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Assignment_ID - a string of seven numeric characters\
&emsp;&emsp;&emsp;Course_ID - a string with 4 leading characters corresponding to the department code, followed by 3 numeric\
&emsp;&emsp;&emsp;&emsp;&emsp;characters, each ranging from [0-9]\
&emsp;&emsp;&emsp; Section_ID - a string of 3 numeric characters ranging from [0-9]\
&emsp;&emsp;&emsp;Semester - a string either Fall or Spring\
&emsp;&emsp;&emsp;Year - anything in the range from 1996 until 2021 (max year is updated every single year)\
&emsp;**Constraints:** N/A\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Assigns.Assignment_ID references Assignment.Assignment_ID, \
&emsp;&emsp;&emsp;Assigns.Course_ID references Course.Course_ID,\
&emsp;&emsp;&emsp;Assigns.Section_ID references Section.Section_ID,\
&emsp;&emsp;&emsp;Assigns.Semester references Section.Semseter,\
&emsp;&emsp;&emsp;Assigns.Year references Section.Year



---
Hosts(<ins>Email</ins>, <ins>Date</ins>, <ins>Location</ins>, <ins>Start_Time</ins>)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;            Date - Date\
&emsp;&emsp;&emsp;            Location - String\
 &emsp;&emsp;&emsp;           Start_Time - Time
 
&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;Date - a date in the following format: YYYY-MM-DD where YYYY corresponds to 4 numeric characters\
&emsp;&emsp;&emsp;&emsp;&emsp;ranging from [0-9] for the year, MM corresponds to 2 numeric characters ranging \
&emsp;&emsp;&emsp;&emsp;&emsp;from [0-9] for the month, and 2 numeric characters ranging from [0-9] for the day. \
&emsp;&emsp;&emsp;   Location - a string of characters\
&emsp;&emsp;&emsp;  Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;**Constraints:** \
&emsp;&emsp;&emsp;The location is either a zoom link or a location in the format - Building-Room#\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Hosts.Email references Person.Email, \
&emsp;&emsp;&emsp;Hosts.Date references Study_Session.Date, \
&emsp;&emsp;&emsp;Hosts.Location references Study_Session.Location,\
&emsp;&emsp;&emsp;Hosts.Start_Time references Study_Session.Start_Time



---
For(<ins>Assignment_ID</ins>, <ins>Date</ins>, <ins>Location</ins>, <ins>Start_Time</ins>)\
&emsp;**Types:** \
&emsp;&emsp;&emsp;Assignment_ID - String\
&emsp;&emsp;&emsp;            Date - Date\
&emsp;&emsp;&emsp;            Location - String\
&emsp;&emsp;&emsp;            Start_Time - Time

&emsp;**Domain:** \
&emsp;&emsp;&emsp;Assignment_ID - a string of seven numeric characters\
&emsp;&emsp;&emsp; Date - a date in the following format: YYYY-MM-DD where YYYY corresponds to 4 numeric characters ranging \
&emsp;&emsp;&emsp;&emsp;&emsp;from [0-9] for the year, MM corresponds to 2 numeric characters ranging from [0-9] for the month, \
&emsp;&emsp;&emsp;&emsp;&emsp;and 2 numeric characters ranging from [0-9] for the day. \
&emsp;&emsp;&emsp;Location - a string of characters\
&emsp;&emsp;&emsp;Start_Time -  a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;**Constraints:** The location is either a zoom link or a location in the format - Building-Room#\
&emsp;**Foreign Key:** \
&emsp;&emsp;&emsp;For.Assignment_ID references Assignment.Assignment_ID, \
&emsp;&emsp;&emsp;For.Date references Study_Session.Date, \
&emsp;&emsp;&emsp;For.Location references Study_Session.Location, \
&emsp;&emsp;&emsp;For.Start_Time references Study_Session.Start_Time



---
Attends(<ins>Email</ins>, <ins>Date</ins>, <ins>Location</ins>, <ins>Start_Time</ins>)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;            Date - String\
&emsp;&emsp;&emsp;            Location - String\
&emsp;&emsp;&emsp;            Start_Time - Time

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;Date - a date in the following format: YYYY-MM-DD where YYYY corresponds to 4 numeric characters ranging \
&emsp;&emsp;&emsp;&emsp;&emsp;from [0-9] for the year, MM corresponds to 2 numeric characters ranging from [0-9] for the month, \
&emsp;&emsp;&emsp;&emsp;&emsp;and 2 numeric characters ranging from [0-9] for the day. \
&emsp;&emsp;&emsp;Location - a string of characters\
&emsp;&emsp;&emsp;Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;**Constraints:** \
&emsp;&emsp;&emsp;The location is either a zoom link or a location in the format - Building-Room#\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Attends.Email references Person.Email, \
&emsp;&emsp;&emsp;Attends.Date references Study_Session.Date, \
&emsp;&emsp;&emsp;Attends.Location references Study_Session.Location, \
&emsp;&emsp;&emsp;Attends.Start_Time references Study_Session.Start_Time



---
Has(<ins>Day</ins>, <ins>Start_Time</ins>, <ins>Location</ins>, Course_ID, Section_ID, Semester, Year)\
&emsp;**Types:** 
&emsp;&emsp;&emsp;Day - String\
&emsp;&emsp;&emsp;            Start_Time - Time\
&emsp;&emsp;&emsp;            Location - String\
&emsp;&emsp;&emsp;Course_ID - String\
&emsp;&emsp;&emsp;Section_ID - String\
&emsp;&emsp;&emsp;Semester - String\
&emsp;&emsp;&emsp;Year - Integer

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Day - a string composed of one of the following characters U, M, T, W, R, F, S where they \
&emsp;&emsp;&emsp;&emsp;&emsp;correspond to the following days: U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday\
&emsp;&emsp;&emsp;Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \  
&emsp;&emsp;&emsp;Location - a string of characters\
&emsp;&emsp;&emsp;  Course_ID - a string with 4 leading characters corresponding to the department \
&emsp;&emsp;&emsp;  Section_ID -  a string of 3 numeric characters ranging from [0-9]\
&emsp;&emsp;&emsp;  Semester - a string either Fall or Spring\
 &emsp;&emsp;&emsp; Year - anything in the range from 1996 until 2021 (max year is updated every single\
&emsp;**Constraints:**\
&emsp;&emsp;&emsp;The location is either a zoom link or a location in the format - Building-Room#\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Has.Day references Office_Hours.Day, \
&emsp;&emsp;&emsp;Has.Start_Time references Office_Hours.Start_Time,\
&emsp;&emsp;&emsp;Has.Location references Office_Hours.Location,\
&emsp;&emsp;&emsp;Has.Course_ID references Course.Course_ID, \
&emsp;&emsp;&emsp;Has.Section_ID references Section.Section_ID, \
&emsp;&emsp;&emsp;Has.Semester references Section.Semester, \
&emsp;&emsp;&emsp;Has.Year references Section.Year


---
Holds(<ins>Day</ins>, <ins>Start_Time</ins>, <ins>Location</ins>, Email)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Day - String\
&emsp;&emsp;&emsp;            Start_Time - Time\
&emsp;&emsp;&emsp;            Location - String\
&emsp;&emsp;&emsp;            Email - String

&emsp;**Domain:** \
&emsp;&emsp;&emsp;Day - a string composed of one of the following characters U, M, T, W, R, F, S where they correspond to the \
&emsp;&emsp;&emsp;&emsp;&emsp;following days: U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday\
&emsp;&emsp;&emsp;Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp;              Location - a string of characters\
&emsp;&emsp;&emsp;              Email - a string of characters followed by @vcu.edu\
&emsp;**Constraints:**\
&emsp;&emsp;&emsp;The location is either a zoom link or a location in the format - Building-Room#\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Holds.Day references Office_Hours.Day, \
&emsp;&emsp;&emsp;Holds.Start_Time references Office_Hours.Start_Time,\
&emsp;&emsp;&emsp;Holds.Location references Office_Hours.Location, \
&emsp;&emsp;&emsp;Holds.Email references Person.Email



---
Visits(<ins>Email</ins>, <ins>Day</ins>, <ins>Start_Time</ins>, <ins>Location</ins>)\
&emsp;**Types:**\
&emsp;&emsp;&emsp;Email - String\
&emsp;&emsp;&emsp;Day - String\
&emsp;&emsp;&emsp;Start_Time - Time\
&emsp;&emsp;&emsp;Location - String

&emsp;**Domain:**\
&emsp;&emsp;&emsp;Email - a string of characters followed by @vcu.edu\
&emsp;&emsp;&emsp;Day - a string composed of one of the following characters U, M, T, W, R, F, S where they correspond to the\
&emsp;&emsp;&emsp;&emsp;&emsp;following days: U - Sunday, M - Monday, T - Tuesday, W - Wednesday, R - Thursday, F - Friday, S - Saturday\
&emsp;&emsp;&emsp;Start_Time - a time in the format XX:XX ranging from 00:00 to 23:59 \
&emsp;&emsp;&emsp;Location - a string of characters\
&emsp;**Constraints:**\
&emsp;&emsp;&emsp;The location is either a zoom link or a location in the format - Building-Room#\
&emsp;**Foreign Key:**\
&emsp;&emsp;&emsp;Visits.Email references Person.Email,\
&emsp;&emsp;&emsp;Visits.Day references Office_Hours.Day,\
&emsp;&emsp;&emsp;Visits.Start_Time references Office_Hours.Start_Time,\
&emsp;&emsp;&emsp;Visits.Location references Office_Hours.Location


