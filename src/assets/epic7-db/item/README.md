# Contributing to Items/Resources

1. Identify an Item in-game that the json counterpart is missing
    - Or identify a existing one with typo and/or wrong information
2. Create a new json file with the name of the item
    - Follow the rules stated on `General Contributing Rules` @ repository's root `README.md`
    - If the item name contains spaces, replace them for `-` (dashes).
        - E.g.: `Greater Fire Rune` becomes `greater-flame-rune.json`
3. Follow the standard names for the properties, see `greater-flame-rune.json` for example
4. Create a PR with your changes
5. Thank you for contributing

### Properties

-   `name`
-   `description`: string. If needs paragraph, add `\n`
-   `type`: An item can be of the following type:
    -   `currency`
    -   `rune`
    -   `catalyst`
    -   `skill-enhance`
    -   `craft-materials`
-   `rarity`
-   `locations`: array of objects describing drop locations, example object below:

```
     {
        "node": "Normal 2-9",
        "name": "Hailow Lab Tower",
        "mobcount": 10
    }
```
