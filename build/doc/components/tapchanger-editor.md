# tapchanger-editor

## Properties

| Property        | Attribute       | Modifiers | Type          | Default | Description                                      |
|-----------------|-----------------|-----------|---------------|---------|--------------------------------------------------|
| `addButton`     |                 |           | `IconButton`  |         |                                                  |
| `addMenu`       |                 |           | `Menu`        |         |                                                  |
| `doc`           |                 |           | `XMLDocument` |         | The document being edited as provided to editor by [[`Zeroline`]]. |
| `element`       |                 |           | `Element`     |         | SCL element TransformerWinding                   |
| `header`        |                 | readonly  | `string`      |         |                                                  |
| `showfunctions` | `showfunctions` |           | `boolean`     | false   | Whether `EqFunction` and `SubEquipment` are rendered |

## Methods

| Method   | Type       |
|----------|------------|
| `remove` | `(): void` |
