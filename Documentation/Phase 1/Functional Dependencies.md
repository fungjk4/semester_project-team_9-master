<h1> Functional Dependencies </h1>


**Person** = {Email →  First_Name, Last_Name}

**Student** = {Email →  V_Number 

V_Number →  Email}

**TA** = {Email → V_Number, TA_ID 

TA_ID → Email, V_Number

V_Number → Email, TA_ID}

**Professor** = {Email → Professor_ID

Professor_ID → Email}

**Event** = {Email, Start_Time, End_Time, Date → Task}

**Course** = {Course_ID → Title}

**Section** = {Course_ID, Section_ID, Semester, Year → Start_Time, End_Time, Day}

**Assignment** = {Assignment_ID → Name, Due_Date, Time, Description}

**Study Session** = {Date, Location, Start_Time → End_Time, Course_Name, Mode}

**Office Hours** = {Day, Start_Time, Location → End_Time, Mode}

**Takes** = {Course_ID, Email → Section_ID, Semester, Year, Grade}

**TAS_For:** N/A

**Works_On:** N/A

**Course_Section:** N/A

**Schedule:** N/A

**Teaches** = {Course_ID, Section_ID, Semester, Year → Email}

**Assigns** = {Assignment_ID → Course_ID, Section_ID, Semester, Year}

**Hosts** = {Email, Start_Time, Date → Mode, Location, End_Time

Email, End_Time, Date → Mode, Location, Start_Time}

**For** = {Assignment_ID, Date, Start_Time → Location}

**Attends** = {Email, Date, Start_Time → Mode, Location, End_Time, Course_Name 

Email, Date, End_Time → Mode, Location, Start_Time, Course_Name}

**Has** = {Day, Start_Time, Location, Year → Course_ID, Section_ID, Semester 

Day, Start_Time, Section_ID, Year → Course_ID, Location, Semester}

**Holds** = {Day, Start_Time, Location → Email 

Email, Day, Start_Time → Location}


**Visits** = {Day, Start_Time, Email → Location}
