-- Stored procedure utilized in the triggers
delimiter //

create procedure insert_row(in newEmailVar varchar(30), newStartVar time, newDateVar date, newLocationVar varchar(200), taskVar varchar(100))
begin 
	insert into event values(newEmailVar, newStartVar, 
    (select end_time 
    from study_session 
    where start_time = newStartVar and date = newDateVar and location = newLocationVar), 
    newDateVar, taskVar);
end //
delimiter ;

-- Trigger to insert on event when student attends study session
delimiter //

create trigger insert_ta_study_session_event
after insert on hosts
for each row
begin
call insert_row(new.email, new.start_time, new.date, new.location, 'Host Study Session');
END //

delimiter ;

-- Trigger to insert on event when ta hosts study session
delimiter //

create trigger insert_student_study_session_event
after insert on attends
for each row
begin
call insert_row(new.email, new.start_time, new.date, new.location, 'Study Session');
END //

delimiter ;
