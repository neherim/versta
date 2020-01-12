export const schemaExample1 = {
  services: [
    {
      id: "1",
      name: "scrooge-message-registry",
      x: 200,
      y: 100,
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
      x: 300,
      y: 200,
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
      x: 100,
      y: 50,
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
      id: "41",
      from: "3",
      to: "5"
    },
    {
      id: "42",
      from: "6",
      to: "2"
    },
    {
      id: "43",
      from: "3",
      to: "10"
    }
  ]
};

export const schema1 = <any>{
  id: "2ccdf1c3-27d2-4d74-83d9-79d0f29e254a",
  offsetX: 0,
  offsetY: 0,
  zoom: 100,
  gridSize: 15,
  layers: [
    {
      id: "59c30b6f-1441-438c-b220-7c1bfe3b131d",
      type: "diagram-links",
      isSvg: true,
      transformed: true,
      models: {
        "41": {
          id: "41",
          locked: true,
          type: "rightAngle",
          selected: false,
          source: "1",
          sourcePort: "3",
          target: "4",
          targetPort: "5",
          points: [
            {
              id: "aabb1ab2-4180-49ac-8ed1-b39977799d90",
              type: "point",
              x: 489.40625,
              y: 93.5
            },
            {
              id: "4fc9e9d7-1f0b-43fa-8764-96b701d51b12",
              type: "point",
              x: 626,
              y: 93.5
            },
            {
              id: "3eb8a222-9fd4-492b-aa3a-8abe1ec15ad2",
              type: "point",
              x: 626,
              y: 93.5
            },
            {
              id: "79fc4713-e072-45dd-beff-e60eae63e3c6",
              type: "point",
              x: 684.5,
              y: 93.5
            }
          ],
          labels: [],
          width: 3,
          color: "gray",
          curvyness: 50,
          selectedColor: "rgb(0,192,255)"
        },
        "42": {
          id: "42",
          locked: true,
          type: "rightAngle",
          selected: false,
          source: "4",
          sourcePort: "6",
          target: "1",
          targetPort: "2",
          points: [
            {
              id: "72aaa981-5d73-4e5b-acb4-27533e5da767",
              type: "point",
              x: 1044.40625,
              y: 93.5
            },
            {
              id: "bb49b6cc-6baf-445a-ac2b-52851b00160b",
              type: "point",
              x: 1159,
              y: 93.5
            },
            {
              id: "5ffb623b-be4f-4f4c-8439-e11829cb1521",
              type: "point",
              x: 1159,
              y: 523
            },
            {
              id: "280709f6-27ea-4ce3-9853-6f6345b8802f",
              type: "point",
              x: 93,
              y: 523
            },
            {
              id: "4f5348fc-cd6f-41e9-8699-392ddfd2562b",
              type: "point",
              x: 93,
              y: 93.5
            },
            {
              id: "9bedde21-58f5-4bc1-a086-18e4254d10eb",
              type: "point",
              x: 129.5,
              y: 93.5
            }
          ],
          labels: [],
          width: 3,
          color: "gray",
          curvyness: 50,
          selectedColor: "rgb(0,192,255)"
        },
        "43": {
          id: "43",
          locked: true,
          type: "rightAngle",
          selected: false,
          source: "1",
          sourcePort: "3",
          target: "9",
          targetPort: "10",
          points: [
            {
              id: "9257087e-8d35-46fa-89a3-0dbb33e1a1a0",
              type: "point",
              x: 489.40625,
              y: 93.5
            },
            {
              id: "d7dc56a6-21dc-4250-a9bc-ad5c8023f40b",
              type: "point",
              x: 595,
              y: 93.5
            },
            {
              id: "2a9e0aa2-a620-4e21-807b-6a9119020438",
              type: "point",
              x: 595,
              y: 408.5
            },
            {
              id: "e85ad3a4-05ae-43f1-83bc-ece7c2869b1a",
              type: "point",
              x: 669.5,
              y: 408.5
            }
          ],
          labels: [],
          width: 3,
          color: "gray",
          curvyness: 50,
          selectedColor: "rgb(0,192,255)"
        }
      }
    },
    {
      id: "e6086ad4-406d-4e95-b393-b88fc3a2d014",
      type: "diagram-nodes",
      isSvg: false,
      transformed: true,
      models: {
        "1": {
          id: "1",
          type: "default",
          selected: false,
          x: 120,
          y: 60,
          ports: [
            {
              id: "2",
              type: "default",
              x: 122,
              y: 86,
              name: "SendOutputResponseCommand",
              alignment: "left",
              parentNode: "1",
              links: ["42"],
              in: true,
              label: "SendOutputResponseCommand"
            },
            {
              id: "3",
              type: "default",
              x: 481.90625,
              y: 86,
              name: "ProcessInputRequestCommand",
              alignment: "right",
              parentNode: "1",
              links: ["41", "43"],
              in: false,
              label: "ProcessInputRequestCommand"
            }
          ],
          name: "scrooge-message-registry",
          color: "rgba(192,255,0,0.5)",
          portsInOrder: ["2"],
          portsOutOrder: ["3"]
        },
        "4": {
          id: "4",
          type: "default",
          selected: false,
          x: 675,
          y: 60,
          ports: [
            {
              id: "5",
              type: "default",
              x: 677,
              y: 86,
              name: "ProcessInputRequestCommand",
              alignment: "left",
              parentNode: "4",
              links: ["41"],
              in: true,
              label: "ProcessInputRequestCommand"
            },
            {
              id: "6",
              type: "default",
              x: 1036.90625,
              y: 86,
              name: "SendOutputResponseCommand",
              alignment: "right",
              parentNode: "4",
              links: ["42"],
              in: false,
              label: "SendOutputResponseCommand"
            },
            {
              id: "7",
              type: "default",
              x: 1036.90625,
              y: 102,
              name: "PersonalDataUpdated",
              alignment: "right",
              parentNode: "4",
              links: [],
              in: false,
              label: "PersonalDataUpdated"
            },
            {
              id: "8",
              type: "default",
              x: 1036.90625,
              y: 118,
              name: "OrganizationChanged",
              alignment: "right",
              parentNode: "4",
              links: [],
              in: false,
              label: "OrganizationChanged"
            }
          ],
          name: "scrooge-person",
          color: "rgba(192,255,0,0.5)",
          portsInOrder: ["5"],
          portsOutOrder: ["6", "7", "8"]
        },
        "9": {
          id: "9",
          type: "default",
          selected: false,
          x: 660,
          y: 375,
          ports: [
            {
              id: "10",
              type: "default",
              x: 662,
              y: 401,
              name: "ProcessInputRequestCommand",
              alignment: "left",
              parentNode: "9",
              links: ["43"],
              in: true,
              label: "ProcessInputRequestCommand"
            },
            {
              id: "11",
              type: "default",
              x: 1021.90625,
              y: 401,
              name: "SendOutputResponseCommand",
              alignment: "right",
              parentNode: "9",
              links: [],
              in: false,
              label: "SendOutputResponseCommand"
            }
          ],
          name: "scrooge-statement",
          color: "rgba(192,255,0,0.5)",
          portsInOrder: ["10"],
          portsOutOrder: ["11"]
        }
      }
    }
  ]
};
