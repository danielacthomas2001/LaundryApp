/*
class LaundryMachine:
	attributes:
		machineID
		machineType
		status
		location
	methods:
		checkStatus():
			return status
		updateStatus(new_status):
			status = new_status
*/


class LaundryMachine {
    constructor(machine_id, machine_type, status, location) {
        this.machine_id = machine_id
        this.machine_type = machine_type
        this.status = status
        this.location = location
    }

    check_status() {
        return this.status;
    }


    // async check_status() {
    //     const response = await // database api
    //     const data = await response.json();
    //     this.status = data.status;
    //     return this.status;
    // }

    update_status(new_status) {
        this.status = new_status;
    }

    check_type() {
        return this.machine_type;
    }

    check_location() {
        return this.location;
    }
}