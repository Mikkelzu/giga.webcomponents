## Summary

This library was built with the intention of being a passion project, but also to create some nice web components that are easily implemented, customized and used without the need to have external dependencies. No need to depend on things like bootstrap or materialize to get these components working.

## What icon libraries do we support?

Currently, we have built this library to use [Font Awesome 5](https://fontawesome.com) for a pre-baked icon library. However, we don't depend on Font Awesome being included. For more information, you can see how to use the exposed methods down below!

We do plan on also implementing other libraries to support them, but at the moment we only support FA5 due to it being the most used icon library there is (currently).

## Methods

To implement the basic toast, after importing both CSS and JS files, you can then call the public toast method with `giga.toast();`.

Basic toast:

``` js
giga.toast(constants.TOAST.SUCCESS, {text: 'Toast text'});
```

Toast with custom icon:

``` js
giga.toast(constants.TOAST.SUCCESS, {text: 'Toast text', icon: 'icon-class'});
```

Toast with longer timeout:

``` js
giga.toast(constants.TOAST.SUCCESS, {text: 'Toast text', icon: 'icon-class', timeOut: 2500});
```

Toast positioned top left:

``` js
giga.toast(constants.TOAST.SUCCESS, {text: 'Toast text', icon: 'icon-class', position: 'top-left'});
```

Custom toast style class (given this class exists in your stylesheet):
``` js
giga.toast('my-custom-style', {text: 'Custom toast style!'});
```

## Constants

As you may have noticed, in the example implementations above you see an object `constants` with the property `TOAST`. This is to signify what kind of toast we are looking for. We have exposed 4 different toast types, the standards that are being used:

```js
constants.TOAST.SUCCESS
constants.TOAST.INFO
constants.TOAST.FAILURE
constants.TOAST.WARNING
```

In the future, we will be adding more properties to the `constants` object. When this happens, we will update the docs accordingly.

The reason we chose to use this method of setting things, is mostly so we keep a consistent implementation of our standards. However, we always will allow for customization. (See the toasts methods above for the custom class)

## Some developers notes

During development, some of the objects, method and other things will either be deprecated or have their names changed to be more fitting.
Currently the library is called "Giga" but this is subject to change as we speed along development and prepare for a full release to the public.

## Docs version
0.5.0