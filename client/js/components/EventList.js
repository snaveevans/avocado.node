class EventsList extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.selectedEventId = '04b67765-f552-4da3-bb2e-5e843701601f';
        this.events = [];
        this.cards = {};

        var filter = 'upcoming';

        if (this.hasAttribute('filter'))
            filter = this.getAttribute('filter');

        this.style.display = 'table';
        this.style.width = '100%';
        this.style.height = 'calc(100vh - 95px)';
        this.style.backgroundImage = 'linear-gradient(-135deg, #274B75 0%, #253247 100%)';

        var titleContainer = document.createElement('div');
        titleContainer.style.display = 'table-caption';
        titleContainer.style.color = '#FFFFFF';
        this.appendChild(titleContainer);

        var titleText = filter === 'mine' ?
            'My Events' :
            'Upcoming Events';
        var title = document.createElement('div');
        title.className = 'h3';
        title.style.margin = '12px 10px 13px 10px';
        title.appendChild(document.createTextNode(titleText));
        titleContainer.appendChild(title);

        var rowGroup = document.createElement('div');
        rowGroup.style.display = 'table-row-group';
        this.appendChild(rowGroup);

        var eventContainer = document.createElement('div');
        eventContainer.style.display = 'table-row';
        eventContainer.style.paddingBottom = '20px';
        rowGroup.appendChild(eventContainer);

        var indexById = function (id) {
            return function (event) {
                return event.id === id;
            }
        }

        var onCardClick = function (eventId) {
            if (this.selectedEventId === eventId)
                return console.log('Open card ' + eventId);

            this.selectedEventId = eventId;
            var selectedIndex = this.events.findIndex(indexById(this.selectedEventId));

            for (var i = 0; i < this.events.length; i++) {
                var event = this.events[i];
                var card = this.cards[event.id];
                var eventIndex = this.events.findIndex(indexById(event.id));

                var index = eventIndex - selectedIndex;
                card.setOrder(index);
            }
        }.bind(this);

        // get events
        this.events = [
            {
                id: 'b37250a2-f3ca-42c9-9adb-cee833a9c84e',
                title: 'LAN Party',
                description: "Let's all play some PUBG and some Siege!",
                color: 'greenyellow'
            },
            {
                id: '04b67765-f552-4da3-bb2e-5e843701601f',
                title: 'Star Wars Marathon',
                description: 'Self-expanatory',
                color: 'teal'
            },
            {
                id: 'b956e7cb-a5ce-4574-9672-3a2941cdce49',
                title: 'Hacknight SLC',
                description: 'hack away at some code',
                color: 'orange'
            }
        ];

        var selectedIndex = this.events.findIndex(indexById(this.selectedEventId))

        for (var i = 0; i < this.events.length; i++) {
            var event = this.events[i];

            var card = document.createElement('event-card');
            card.event = event;
            card.onCardClick = function () {
                onCardClick(this.id);
            }.bind(event);

            var eventIndex = this.events.findIndex(indexById(event.id));

            var index = eventIndex - selectedIndex;

            eventContainer.appendChild(card);
            card.setOrder(index);
            this.cards[event.id] = card;
        }
    }
}
customElements.define('events-list', EventsList, { extends: 'div' });