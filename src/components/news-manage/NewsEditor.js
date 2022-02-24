import { ContentState, convertToRaw, EditorState } from 'draft-js'
import React, { useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default function NewsEditor(props) {
    useEffect(() => {
        const html = props.content
        if(!html) return 
        const contentBlock = htmlToDraft(html)
        if(contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            setEditorState(editorState)
        }
    }, [props.content])

    const [editorState, setEditorState] = useState("")

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName='wrapperClassName'
                editorClassName='editorClassName'
                onEditorStateChange={editorState => {
                    setEditorState(editorState)
                }}
                onBlur={() => {
                    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
            />
        </div>
    )
}
