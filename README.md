# Summernote-ToC

This is a plugin for Summernote WYSIWYG Editor

# Usage
1. Add the CDN or download the `summernote-toc.js` file and link to the project.
```
<script src="summernote-toc.js"></script>
```
2. Add Button to the Tool Bar
```
$('#summernote').summernote({
    toolbar:[
        ...
        ['insert',['link','picture','video','hr','toc']],
        ...
    ]
})
```
# Credits
I took the inspiration from the [summernote-table-of-content](https://github.com/nicrf/summernote-table-of-content) project.