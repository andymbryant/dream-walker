const MOCK_DREAM_ENTRIES = {
    "dreamEntries": [
        {
            "id": "1111111",
            "title": "Crazy Dream 1",
            "entry": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id scelerisque leo, vel pharetra leo. Duis vitae metus auctor, bibendum dolor ut, faucibus risus. Integer varius dictum risus ut placerat. Sed orci nulla, placerat tincidunt tellus id, elementum iaculis magna. Morbi ac lectus convallis, sodales ligula ac, bibendum leo. Integer et blandit lacus, nec luctus massa.",
            "type": "lucid",
            "mood": "pleasant",
            "emotion": "joy",
            "date": "12.01.16",
            "hoursSlept": 8
        },
        {
            "id": "2222222",
            "title": "Crazy Dream 2",
            "entry": "Curabitur in diam finibus, convallis ipsum posuere, auctor erat. Ut varius dolor id consequat sollicitudin. Nunc nulla eros, auctor in diam sit amet, fermentum semper massa. Nulla in mattis ante. Aenean accumsan tellus sit amet dui scelerisque, eget auctor metus feugiat. Fusce vehicula massa a nibh posuere, quis rhoncus lorem efficitur.",
            "type": "lucid",
            "mood": "pleasant",
            "emotion": "joy",
            "date": "12.02.16",
            "hoursSlept": 8
        },
        {
            "id": "333333",
            "title": "Crazy Dream 3",
            "entry": "Etiam tempus, neque quis facilisis interdum, neque nibh vulputate mi, vel finibus justo mi et nisi.",
            "type": "lucid",
            "mood": "pleasant",
            "emotion": "joy",
            "date": "12.03.16",
            "hoursSlept": 8
        },
        {
            "id": "4444444",
            "title": "Crazy Dream 4",
            "entry": "In neque ligula, commodo vel varius et, finibus eget justo. Vivamus at placerat eros. Fusce vel arcu turpis. Maecenas vitae luctus diam. Quisque volutpat sollicitudin sapien at molestie. In accumsan efficitur orci, sed sodales odio.",
            "type": "lucid",
            "mood": "pleasant",
            "emotion": "joy",
            "date": "12.04.16",
            "hoursSlept": 8
        }
    ]
};

function getDreamEntries(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_DREAM_ENTRIES)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayDreamEntries(data) {
    for (index in data.dreamEntries) {
       $('body').append(
        '<p>' + data.dreamEntries[index].entry + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayDreamEntries() {
    getDreamEntries(displayDreamEntries);
}

/*$(function() {
    getAndDisplayDreamEntries();
})*/