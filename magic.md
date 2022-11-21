# Notes on Magic Mirror
![MagicMirror²: The open source modular smart mirror platform. ](.github/header.png)

<p style="text-align: center">
  <a href="https://choosealicense.com/licenses/mit">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
    </a>
    <img src="https://img.shields.io/github/workflow/status/michmich/magicmirror/Run%20Automated%20Tests" alt="GitHub Actions">
    <img src="https://img.shields.io/github/checks-status/michmich/magicmirror/master" alt="Build Status">
    <a href="https://codecov.io/gh/MichMich/MagicMirror">
        <img src="https://codecov.io/gh/MichMich/MagicMirror/branch/master/graph/badge.svg?token=LEG1KitZR6" alt="CodeCov Status"/>
    </a>
    <a href="https://github.com/MichMich/MagicMirror">
        <img src="https://img.shields.io/github/stars/michmich/magicmirror?style=social">
    </a>
</p>

**Reference: <https://docs.magicmirror.builders/>**

### Basic Commands
- To start magic mirror use `npm run start` inside the `MagicMirror` directory
- To exit out press the `Alt` key and select `Quit` from `File` tab
- to start the Mirror remotely use (not working to well)
    ```sh
    DISPLAY=:0 nohup npm start &
    ```

    still trying, to avoid output, use:
    ```
    nohup php server1.php </dev/null &>/dev/null &
    ```

# TO DO
- [ ] Modules that need to be added
    - [ ] NBA Standings and Game of the day
    - [ ] Spotify
    - [ ] Phillips Hue
    - [ ] Sonos Move
- [ ] add some color
- [ ] Select Mirror/wood frame
- [ ] Use a TV stand for the TV and mirror
- [ ] Google Keep 


