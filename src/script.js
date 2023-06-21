const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")

function update_visor(timer) {
    hours.value = timer.Date.getHours()
    minutes.value = timer.Date.getMinutes()
    seconds.value = timer.Date.getSeconds()
}

function createTime(time) {
    return {
        Date: new Date(0, 0, 0, time.hours, time.minutes, time.seconds),
        isNull: function() {
            if(this.Date.getHours() == 0 && 
            this.Date.getMinutes() == 0 && 
            this.Date.getSeconds() == 0)
                return true;
    
            return false;
        },
        degree: function() {
            this.Date.setSeconds(this.Date.getSeconds() - 1)
            update_visor(this)
        }
    }
}

var interval_cache
function pause() {
        clearInterval(interval_cache)
}

function reset() {
    stop()
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
}

function start() {
    const initial_time = {
        hours: hours.value,
        minutes: minutes.value,
        seconds: seconds.value
    }

    const main_time = createTime(initial_time)

    var interval = setInterval(function() {
        if(main_time.isNull()) {
            clearInterval(interval)
            alert("Acabou!")
            return
        }

        main_time.degree()
        console.log(main_time.Date.getSeconds())
        interval_cache = interval

    }, 1000)
}

