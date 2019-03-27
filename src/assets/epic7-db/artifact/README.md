# Contributing to Artifacts

1. Identify an Artifact in-game that the json counterpart is missing
    - Or identify a existing one with typo and/or wrong information
2. Create a new json file with the name of the artifact
    - Follow the rules stated on `General Contributing Rules` @ repository's root `README.md`
    - If the artifact name contains spaces, replace them for `-` (dashes).
        - E.g.: Artifact `Wondrous Potion Vial` becomes `wondrous-potion-vial.json`
3. Follow the standard names for the properties, see `wondrous-potion-vial.json` for example
4. Create a PR with your changes
5. Thank you for contributing

### Properties

-   `exclusive`: This refers to a class-exclusive artifact. Currently there are no multi-class exclusives, but supposing it might exist in the future, please keep as an array. If it's not a class exclusive, have it as an empty array.
    -   E.g.: `"exclusive": [],` or `"exclusive": ["soul-weaver"],`
-   `loreDescription`: Some artifacts might contain more than one paragraph, for exemple, ones that have a quote, which then, on a new line adds `- someone, from somewhere`. Each array entry is a paragraph.
