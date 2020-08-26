## Summary

This library was built with the intention of being a passion project, but also to create some nice web components that are easily implemented, customized and used without the need to have external dependencies. No need to depend on things like bootstrap or materialize to get these components working.

## What icon libraries do we support?

Currently, we have built this library to use [Font Awesome 5](https://fontawesome.com) for a pre-baked icon library. However, we don't depend on Font Awesome being included. For more information, you can see how to use the exposed methods down below!

We do plan on also implementing other libraries to support them, but at the moment we only support FA5 due to it being the most used icon library there is (currently).

# Toast

To implement the basic toast, after importing both CSS and JS files, you can then call the public toast method with `Toast();`. The exposed Toast() method requires 2 params:

```typescript
toastClass: string
options: object
```

`toastClass` is the styling (see below for the 4 out-of-the-box toast classes).

`options` is an object containing properties like, `{text, icon, position, timeOut}`.

The `text` property contains the text the toast should display.

The `icon` property contains an icon class (see above for FA5 for pre-baked icons).

The `position` property is optional, this will default to `'top-right'` if this isn't filled in, can also be set to `'top-left'`;

The `timeOut` property siginifies in milliseconds (noted as ms) after how long the toast should disappear.

Basic toast:

``` js
Toast('success', {text: 'Toast text'});
```

Toast with custom icon:

``` js
Toast('success', {text: 'Toast text', icon: 'icon-class'});
```

Toast with longer timeout:

``` js
Toast('success, {text: 'Toast text', icon: 'icon-class', timeOut: 2500});
```

Toast positioned top left:

``` js
Toast('success', {text: 'Toast text', icon: 'icon-class', position: 'top-left'});
```

Custom toast style class (given this class exists in your stylesheet):
``` js
Toast('my-custom-style', {text: 'Custom toast style!'});
```

## Toast styles

The 4 different out of the box toasts:

```js
'success'
'failure'
'info'
'warning'
```
However, we always will allow for customization. (See the toasts methods above for the custom class)

# Table

To implement the basic table you will need to simply call the `Table()` method. This method has 3 params:

``` typescript
tableId: string
tableHeaderNames: string[]
data: [{}]
```

`tableId` is a string to give the table it's own identifier.

`tableHeaderNames` is a string array to determine the headers on the table for each column.

`data` is an array of object(s) to populate the table and generate the cells for the columns.



## Some developers notes

During development, some of the objects, method and other things will either be deprecated or have their names changed to be more fitting.
Currently the library is called "Giga" but this is subject to change as we speed along development and prepare for a full release to the public.

## Docs version
0.5.2