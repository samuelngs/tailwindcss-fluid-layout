# Tailwind CSS Fluid Layout Plugin

This plugin makes flexible grid layouts with breakouts super easy! Forget about wrapping everything in containers—just use this plugin to generate grids of all sizes that seamlessly handle breakouts. It’s simple, clean, and ready to roll. Plug it in and let your layouts flow!

## Installation

To get started, add the plugin to your Tailwind setup:

```bash
npm install tailwindcss-fluid-layout
```

Then, add the plugin to your `tailwind.config.js` file:

```javascript
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-fluid-layout'),
    // ...
  ],
};
```

## Usage

Start by defining your layout(s) with the desired sizes in the `tailwind.config.js` file:

```javascript
module.exports = {
  theme: {
    layouts: {
      main: {
        sizes: {
          content: '800px',
          popout: '1200px',
          // Add as many sizes as you like! You can also use other CSS units like em, %, and more to keep your layouts super flexible.
        },
        padding: '16px', // optional
      },
      // You can create multiple grid layouts, with each key you define serving as the name for its respective grid template.
    },
  },
};
```

Now, set an element as a container using `grid-cols-{name}` for a column-based layout or `grid-rows-{name}` for a row-based layout. Then apply styles to the child elements to control their sizing and positioning within the grid.

```html
<div class="grid-cols-main">
  <div class="col-full">
    <!-- The `full` size is automatically configured for you and set to 100% to fit within the main layout. Please note that this area will ignore any padding settings and will always match the size of the parent layout. -->
  </div>
  <div class="col-content">
    <!-- This element will be sized at `800px` or less to fit within the parent layout. -->
  </div>
  <div class="col-popout">
    <!-- This element will be sized at `1200px` or less to fit within the parent layout. -->
  </div>
</div>
```

If you would like to position an element to start and end at different grid areas, you could do:

```html
<div class="grid-cols-main">
  <div class="col-start-full col-end-content">
    <!-- This element will be positioned at the start of the parent layout and extend to the end of the content area. -->
  </div>
  <div class="col-start-content-end col-end-full">
    <!-- This element will be positioned starting at the end of the content area and extending to the end of the parent layout. -->
  </div>
</div>
```

## Additional Options

The `tailwindcss-fluid-layout` plugin comes with optional parameters that allow for further customization. When initializing the plugin, you can pass in an object to set various options. For example:

```javascript
require('tailwindcss-fluid-layout')({
  path: 'layouts',
  throwOnError: false,
});
```

### Options Explained:

- **`path`** (default: `layouts`):  
  This option lets you specify a custom path for your layout configurations. By default, the plugin looks for layout values under `layouts` in the `tailwind.config.js` file, but you can rename this path to whatever you prefer.

- **`throwOnError`** (default: `false`):  
  When set to `true`, this option makes the plugin throw an error if there are any issues with the layout configurations. If you'd prefer the plugin to ignore configuration errors and continue building, you can set this option to `false`.

## Limitations

- Currently, all size values within the same layout must be length literals and use the same unit.
