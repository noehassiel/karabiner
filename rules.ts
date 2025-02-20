import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    "description": "Hyper Key (⌃)",
    "manipulators": [
      {
        "description": "Caps Lock -> Hyper Key",
        "from": {
          "key_code": "caps_lock",
          "modifiers": {
            "optional": ["any"]
          }
        },
        "to": [
          {
            "set_variable": {
              "name": "hyper",
              "value": 1
            }
          }
        ],
        "to_after_key_up": [
          {
            "set_variable": {
              "name": "hyper",
              "value": 0
            }
          }
        ],
        "to_if_alone": [
          {
            "key_code": "escape"
          }
        ],
        "type": "basic"
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    /*
    spacebar: open(
      "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
    ),
    */
    // b = "B"rowse
    b: {
      x: open("https://twitter.com"),
      y: open("https://www.youtube.com/"),
      d: open("https://dribbble.com/"),
      t: open("raycast://extensions/the-browser-company/arc/search")
    },
    // o = "Open" applications
    o: {
      a: app("Arc"),
      g: app("Google Chrome"),
      c: app("Calendar"),
      n: app("Notion"),
      e: app("Mail"),
      m: app("Music"),
      h: app("Microsoft Teams"),
      t: app("Warp"),
      i: app("Messages"),
      s: app("Slack"),
      u: app("Clickup"),
      v: app("Visual Studio Code"),
    },
    // h = "Home"
    h: {
      o: open("raycast://extensions/pindab0ter/hue/toggleAllLights"),
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    // l: {
    //   // Coding layout
    //   c: shell`
    //     open -a "Visual Studio Code.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

    //     open -a "Terminal.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
    //   `,
    // },

    // w = "Window" via rectangle.app
    w: {
      up_arrow: rectangle("top-half"),
      down_arrow: rectangle("bottom-half"),
      left_arrow: rectangle("left-half"),
      right_arrow: rectangle("right-half"),
      return_or_enter: rectangle("maximize"),
      i: rectangle("top-left"),
      o: rectangle("top-right"),
      k: rectangle("bottom-left"),
      l: rectangle("bottom-right"),
      r: {
        description: "Window: Refresh Page",
        to: [
          {
            key_code: "r",
            modifiers: ["left_command"],
          },
        ],
      },
      g: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      h: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      f: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      // "D"o not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      // "T"heme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    m: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      b: open("raycast://extensions/aparandeh/manage-clickup-tasks/capture"),
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      n: open("raycast://extensions/raycast/raycast-notes/create-note"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
