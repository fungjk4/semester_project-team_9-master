<h1> BCNF/4NF DECOMPOSITION </h1>

**Original Schema:** Person(Email, First_Name, Last_Name)\
**Original FDs:** Person = {Email →  First_Name, Last_Name}\
**Decomposed Schemas:** Person(Email, First_Name, Last_Name)\
**Decomposed FDs:** Person = {Email →  First_Name, Last_Name}\
**Justification:** Email is the candidate key, so it is already in BCNF


**Original Schema:** Student(Email, V_Number)\
**Original FDs:** Student = {Email →  V_Number, V_Number →  Email}\
**Decomposed Schema:** Student(Email, V_Number)\
**Decomposed FDs:** Student = {Email →  V_Number, V_Number →  Email}\
**Justification:** The non-redundant FDs is just Email → V_Number which would mean student is already in BCNF



**Original Schema:** TA(Email, V_Number, TA_ID)\
**Original FDs:** TA = {Email → V_Number, TA_ID, TA_ID → Email, V_Number, V_Number → Email, TA_ID}\
**Decomposed Schema:** TA(Email, V_Number, TA_ID)\
**Decomposed FDs:** TA = {Email → V_Number, TA_ID}\
**Justification:** The non-redundant FDs is just Email → V_Number, TA_ID which would mean TA is already in BCNF




**Original Schema:** Professor(Email, Professor_ID)\
**Original FDs:** Professor = {Email → Professor_ID, Professor_ID → Email}\
**Decomposed Schema:** Professor(Email, Professor_ID)\
**Decomposed FDs:** Professor = {Email → Professor_ID}\
**Justification:** The non-redundant FDs is just Email → Professor_ID which would mean Professor is already in BCNF




**Original Schema:** Event(Email, Start_Time, End_Time, Date, Task)\
**Original FDs:** Event = {Email, Start_Time, End_Time, Date → Task}\
**Decomposed Schema:** Event(Email, Start_Time, End_Time, Date, Task)\
**Decomposed FDs:** Event = {Email, Start_Time, End_Time, Date → Task}\
**Justification:** Email, Start_Time, End_Time, Date is the candidate key so Event is already in BCNF




**Original Schema:** Course(Course_ID, Title)\
**Original FDs:** Course = {Course_ID → Title}\
**Decomposed Schema:** Course(Course_ID, Title)\
**Decomposed FDs:** Course = {Course_ID → Title}\
**Justification:** Course_ID is the candidate key so Course is already in BCNF




**Original Schema:** Section(Course_ID, Section_ID, Semester, Year, Start_Time, End_Time, Day)\
**Original FDs:** Section = {Course_ID, Section_ID, Semester, Year → Start_Time, End_Time, Day}\
**Decomposed Schema:** Section(Course_ID, Section_ID, Semester, Year, Start_Time, End_Time, Day)\
**Decomposed FDs:** Section = {Course_ID, Section_ID, Semester, Year → Start_Time, End_Time, Day}\
**Justification:** Course_ID, Section_ID, Semester, Year is the candidate key so Section is already in BCNF



**Original Schema:** Assignment(Assignment_ID, Name, Due_Date, Time, Description)\
**Original FDs:** Assignment = {Assignment_ID → Name, Due_Date, Time, Description}\
**Decomposed Schema:** Assignment(Assignment_ID, Name, Due_Date, Time, Description)\
**Decomposed FDs:** Assignment = {Assignment_ID → Name, Due_Date, Time, Description}\
**Justification:** Assignment_ID is the candidate key so Assignment is already in BCNF 



**Original Schema:** Study Session(Date, Location, Start_Time, End_Time, Course_Name, Mode)\
**Original FDs:** Study Session = {Date, Location, Start_Time → End_Time, Course_Name, Mode}\
**Decomposed Schema:** Study Session(Date, Location, Start_Time, End_Time, Course_Name, Mode)\
**Decomposed FDs:** Study Session = {Date, Location, Start_Time → End_Time, Course_Name, Mode}\
**Justification:** Date, Location, Start_Time is the candidate key so Study Session is already in BCNF 



**Original Schema:** Office Hours(Day, Start_Time, Location, End_Time, Mode)\
**Original FDs:** Office Hours = {Day, Start_Time, Location → End_Time, Mode}\
**Decomposed Schema:** Office Hours(Day, Start_Time, Location, End_Time, Mode)\
**Decomposed FDs:** Office House = {Day, Start_Time, Location → End_Time, Mode}\
**Justification:** Day, Start_Time, Location is the candidate key so Office Hours is already in BCNF



**Original Schema:** Takes(Course_ID, Section_ID, Semester, Year, Email, Grade)\
**Original FDs:** Takes = {Course_ID, Email → Section_ID, Semester, Year, Grade}\
**Decomposed Schema:** Takes(Course_ID, Email, Section_ID, Semester, Year, Grade)\
**Decomposed FDs:** Takes = {Course_ID, Email → Section_ID, Semester, Year, Grade}\
**Justification:** Takes: Course_ID, Email is the candidate key so Takes is already in BCNF



**Original Schema:** TAS_For(Course_ID, Section_ID, Semester, Year, Email)\
**Original FDs:** N/A\
**Decomposed Schema:**\
**Decomposed FDs:**\
**Justification:** There are no functional dependencies so the candidate key is Course_ID, Section_ID, Semester, Year, Email and it is in BCNF. 



**Original Schema:** Works_On(Email, Assignment_ID)\
**Original FDs:** N/A\
**Decomposed Schema:**\ 
**Decomposed FDs:**\
**Justification:** There are no functional dependencies so the candidate key is Email, Assignment_ID and it is in BCNF. 




**Original Schema:** Course_Section(Course_ID, Section_ID, Semester, Year)\
**Original FDs:** N/A\
**Decomposed Schema:**\
**Decomposed FDs:** \
**Justification:** There are no functional dependencies so the candidate key is Course_ID, Section_ID, Semester, Year and it is in BCNF. 



**Original Schema:** Schedule(Email, Start_Time, End_Time, Date)\
**Original FDs:** N/A\
**Decomposed Schema:**\
**Decomposed FDs:**\
**Justification:** There are no functional dependencies so the candidate key is Email, Start_Time, End_Time, Date and it is in BCNF.


**Original Schema:** Teaches(Course_ID, Section_ID, Semester, Year, Email)\
**Original FDs:** Teaches = {Course_ID, Section_ID, Semester, Year → Email}\
**Decomposed Schema:** Teaches(Course_ID, Section_ID, Semester, Year, Email)\
**Decomposed FDs:** Teaches = {Course_ID, Section_ID, Semester, Year → Email}\
**Justification:** Course_ID, Section_ID, Semester, Year is the candidate key so Teaches is already in BCNF.


**Original Schema:** Assigns(Assignment_ID, Course_ID, Section_ID, Semester, Year)\
**Original FDs:** Assigns = {Assignment_ID → Course_ID, Section_ID, Semester, Year}\
**Decomposed Schema:** Assigns(Assignment_ID, Course_ID, Section_ID, Semester, Year)\
**Decomposed FDs:** Assigns = {Assignment_ID → Course_ID, Section_ID, Semester, Year}\
**Justification:** Assignment_ID is the candidate key so Teaches is already in BCNF.



**Original Schema:** Hosts(Email, Date, Location, Start_Time)\
**Original FDs:** Hosts = {Email, Start_Time, Date → Mode, Location, End_Time, Email, End_Time, Date → Mode, Location, Start_Time}\
**Decomposed Schema:** Hosts(Email, Date, Location, Start_Time)\
**Decomposed FDs:** Hosts = {Email, Start_Time, Date → Mode, Location, End_Time, Email, End_Time, Date → Mode, Location, Start_Time}\
**Justification:** The closure for both Email, Start_Time, Date and Email, End_Time, Date would each return all of the attributes. Since these FDs have candidate keys on the left hand side they do not violate constraints for BCNF and Hosts is already in BCNF. 


**Original Schema:** Reivew(Assignment_ID, Date, Location, Start_Time)\
**Original FDs:** Reivew = {Assignment_ID, Date, Start_Time → Location}\
**Decomposed Schema:** Reivew(Assignment_ID, Date, Location, Start_Time)\
**Decomposed FDs:** Reivew = {Assignment_ID, Date, Start_Time → Location}\
**Justification:** Assignment_ID,  Date, Start_Time is the candidate key so Teaches is already in BCNF.

**Original Schema:** Attends(Email, Date, Location, Start_Time)\
**Original FDs:** Attends = {Email, Date, Start_Time → Mode, Location, End_Time, Course_Name, Email, Date, End_Time → Mode, Location, Start_Time, Course_Name}\
**Decomposed Schema:** Attends(Email, Date, Location, Start_Time)\
**Decomposed FDs:** Attends = {Email, Date, Start_Time → Mode, Location, End_Time, Course_Name, Email, Date, End_Time → Mode, Location, Start_Time, Course_Name}\
Justification: The closure for both Email, Date, Start_Time and Email, Date, End_Time would each return all of the attributes. Since these FDs have candidate keys on the left hand side they do not violate constraints for BCNF and Attends is already in BCNF. 

**Original Schema:** Has(Day, Start_Time, Location, Course_ID, Section_ID, Semester, Year)\
**Original FDs:** Has = {Day, Start_Time, Location, Year → Course_ID, Section_ID, Semester, Day, Start_Time, Section_ID, Year → Course_ID, Location, Semester}\
**Decomposed Schema:** Has(Day, Start_Time, Location, Course_ID, Section_ID, Semester, Year)\
**Decomposed FDs:** Has = {Day, Start_Time, Location, Year → Course_ID, Section_ID, Semester, Day, Start_Time, Section_ID, Year → Course_ID, Location, Semester}\
**Justification:** The closure for both Day, Start_Time, Location, Year and Day, Start_Time, Section_ID, Year would each return all of the attributes. Since these FDs have candidate keys on the left hand side they do not violate constraints for BCNF and Has is already in BCNF. 


**Original Schema:** Holds(Day, Start_Time, Location, Email)\
**Original FDs:** Holds = {Day, Start_Time, Location → Email, Email, Day, Start_Time → Location}\
**Decomposed Schema:** Holds(Day, Start_Time, Location, Email)\
**Decomposed FDs:** Holds = {Day, Start_Time, Location → Email, Email, Day, Start_Time → Location}\
**Justification:** The closure for both Day, Start_Time, Location and Email, Day, Start_Time would each return all of the attributes. Since these FDs have candidate keys on the left hand side they do not violate constraints for BCNF and Holds is already in BCNF. 


**Original Schema:** Visits(Email, Day, Start_Time, Location)\
**Original FDs:** Visits = {Day, Start_Time, Email → Location}\
**Decomposed Schema:** Visits(Email, Day, Start_Time, Location)\
**Decomposed FDs:** Visits = {Day, Start_Time, Email → Location}\
**Justification:** Day, Start_Time, Email is the candidate key so Visits is already in BCNF.

