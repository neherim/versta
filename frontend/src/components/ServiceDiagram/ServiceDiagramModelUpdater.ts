export const schemaExample1 = {
    services: [
        {
            id: "1",
            name: "scrooge-message-registry",
            ports: [
                {
                    id: "2",
                    name: "SendOutputResponseCommand",
                    input: true
                },
                {
                    id: "3",
                    name: "ProcessInputRequestCommand",
                    input: false
                }
            ]
        },
        {
            id: "4",
            name: "scrooge-person",
            ports: [
                {
                    id: "5",
                    name: "ProcessInputRequestCommand",
                    input: true

                },
                {
                    id: "6",
                    name: "SendOutputResponseCommand",
                    input: false

                },
                {
                    id: "7",
                    name: "PersonalDataUpdated",
                    input: false

                },
                {
                    id: "8",
                    name: "OrganizationChanged",
                    input: false

                }
            ]
        },
        {
            id: "9",
            name: "scrooge-statement",
            ports: [
                {
                    id: "10",
                    name: "ProcessInputRequestCommand",
                    input: true
                },
                {
                    id: "11",
                    name: "SendOutputResponseCommand",
                    input: false

                }
            ]
        }
    ],

    links: [
        {
            from: "3",
            to: "5"
        },
        {
            from: "6",
            to: "2"
        },
        {
            from: "3",
            to: "10"
        }
    ]
};

export const schemaExample2 = {
    services: [
        {
            id: "1",
            name: "scrooge-message-registry",
            ports: [
                {
                    id: "2",
                    name: "SendOutputResponseCommand",
                                        input: true

                },
                {
                    id: "3",
                    name: "ProcessInputRequestCommand",
                                        input: false
                }
            ]
        },
        {
            id: "4",
            name: "scrooge-person",
            ports: [
                {
                    id: "5",
                    name: "ProcessInputRequestCommand",
                                        input: true

                },
                {
                    id: "6",
                    name: "SendOutputResponseCommand",
                                        input: false
                }
            ]
        }
    ],

    links: [
        {
            from: "3",
            to: "5"
        }
    ]
};
