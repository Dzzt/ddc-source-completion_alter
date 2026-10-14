# ddc-source-completion_alter

A lightweight and fast JSON-based completion source for [ddc.vim](https://github.com/Shougo/ddc.vim).

This plugin allows you to load structured completion items from a JSON file. By pairing it with `matcherKey = "abbr"`, you can easily filter items by their label (`abbr`) or description (`menu`) while inserting the actual body (`word`).

## Concept

Standard snippet engines or heavy completion sources can add noticeable overhead when you only need a quick lookup table. `ddc-source-completion_alter` reads a simple JSON file and passes items directly to `ddc.vim` with minimal processing overhead for maximum performance.

By leaving `mark` empty in your `sourceOptions`, you can leverage `ddc-ui-native`'s automatic column alignment to render a clean, grid-like completion popup.

## Requirements

- [ddc.vim](https://github.com/Shougo/ddc.vim)
- [denops.vim](https://github.com/vim-denops/denops.vim)

## JSON Format

The target JSON file should contain an array of objects matching the standard `ddc.vim` `Item` structure:

```json
[
  {
    "word": "actual_inserted_text",
    "abbr": "search_key_or_short_label",
    "menu": "description_or_additional_info"
  }
]
```

## Example Configuration

### lua (`config_ddc.lua`)

```lua
local fn = vim.fn

-- Filetype specific configuration
fn["ddc#custom#patch_filetype"]("your_filetype", {
  sources = { "completion_alter" },

  sourceOptions = {
    completion_alter = {
      minAutoCompleteLength = 1,
      -- Use 'abbr' field for matching instead of 'word'
      matcherKey = "abbr",
    },
  },

  sourceParams = {
    completion_alter = {
      jsonPath = fn.expand("~/.config/nvim/snippets/data.json"):gsub("\\", "/"),
    },
  },
})
```

### dpp.vim (`ddc.toml`)

```toml
[[plugins]]
repo = 'Dzzt/ddc-source-completion_alter'
on_source = 'ddc.vim'
```

## Source Parameters

| Parameter  | Type     | Default | Description                                                      |
| ---------- | -------- | ------- | ---------------------------------------------------------------- |
| `jsonPath` | `string` | `""`    | Absolute path to the JSON file containing completion candidates. |

## Maintenance Status

This plugin is primarily developed for personal use. Issues and Pull Requests are not accepted. Feel free to fork this repository if you need customization.

## License

MIT