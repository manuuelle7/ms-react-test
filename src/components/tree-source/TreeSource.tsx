import React, { Component } from 'react';
import { BinTreeNode } from '../../models/BinTreeNode';
import {  MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdbreact';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { TreeSourceProps, TreeSourceState } from '../../models/Props';

/**
 * Class of Tree source
 */
class TreeSource extends Component<TreeSourceProps, TreeSourceState> {
    /**
     * Auxiliars variables
     */
    private maxLevel = -1;
    private res = new BinTreeNode(null, null, null);

    /**
     * Constructor
     * @param props 
     */
    constructor(props: any) {
        super(props);
        this.state = {file: null, fileTextValue: '', status: true};
    }

    //#region Events

     /**
      * Function to get the text od the file
      * @param event eventInput
      */
      private handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        this.setState({file: file});
     };

    /**
      * Function to upload the text of the file
      * @param e 
      */
     private upload = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.state.file) {
            // Get text of file uploaded
            const file: File = this.state.file;
            file?.text().then(text => {
                this.setTextState(text);
            });
        } else {
            toast.warning("Choose a file first.",{autoClose:3000, theme:'colored', toastId:3});
        }
     }

    /**
      * Function to clean values
      * @param e 
      */
     private clearValues = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({file: null, fileTextValue: '', status: true});
        if (this.state.file) {
            this.setState({file: null, fileTextValue: '', status: true});
            this.props.treeState('');   
            this.props.smallValueState(null);   
            this.props.treeOutput(null);   
        } else {
            toast.info("Nothing to clear.",{autoClose:3000, theme:'colored', toastId:2});
        }
     }

    //#endregion

    //#region Auxiliar methods

    /**
     * Find de smallest deepest subtree
     * @param node 
     * @returns 
     */
     private findSmallestNode(node: BinTreeNode | null, level: number) : BinTreeNode | null {
        if (node != null) {
            this.findSmallestNode(node.left, ++level);

            // Update level and rescue
            if (level > this.maxLevel)
            {
                this.res = node;
                this.maxLevel = level;
            }

            this.findSmallestNode(node.right, level);
        }

        return this.res;
    }


     /**
     * Method to set the text of the file in de state hook
     * @param valueInput 
     */
      private setTextState(valueInput: string) {
        // Validate if the input is the correct format, if not make something
        try {
            const jsonString = JSON.stringify(this.stringToJson(valueInput), null, '\t');
            this.props.treeState(jsonString);
            this.props.smallValueState(this.findSmallestNode(JSON.parse(jsonString), 0));
            this.props.treeOutput(JSON.parse(jsonString));
        } catch(e) {
            this.setState({file:null});
            this.props.treeState(''); 
            toast.error("There are a problem with the format input",{autoClose:3000, theme:'colored', toastId:1});
        }

        this.setState({fileTextValue: valueInput});
     }     

    /**
     * Method to convert string to Json (BinTreeNode object) 
     * @param inputString 
     * @returns 
     */
    private stringToJson(inputString: string): BinTreeNode {
        let binTree: BinTreeNode = new BinTreeNode(null,null,null);
        // Convert the string in array
        const array: Array<string | number> = JSON.parse(inputString);
        // Set elements in object
        binTree =  this.fillBinaryTree(array);

        return binTree;
    }

    /**
     * Method to fill a binary tree
     * @param array 
     * @returns 
     */
    private fillBinaryTree(array: Array<string | number>): BinTreeNode {
        let treeNode: BinTreeNode = new BinTreeNode(null,null,null);
        let nullValueLeft: boolean = false;

        array.forEach(element => {
            // Check if the element is array, if not the element is the id tree
            if (Array.isArray(element)) {
                const node: BinTreeNode = this.fillBinaryTree(element);
                // Check if there are data in child left of the tree, if true, the element goes to child right, if false the element goes to child left
                if (treeNode.left || nullValueLeft) {
                    treeNode.right = node;
                    nullValueLeft = false;
                }
                else 
                    treeNode.left = node;
            }
            else if (element && element !== '') {
                treeNode.id = element;
            }
            // If the element in array is null, set a flag to not include in tree
            else {
                nullValueLeft = true;
            }
        });

        return treeNode;
    }
    //#endregion

     /**
      * Render
      * @returns 
      */
    render() {
        const value = this.state.fileTextValue;
        const file: File = this.state.file;
        return (
            <MDBContainer>
                <h3 
                    className="grey-text">Tree source 
                </h3>
                <MDBRow middle className="margin" >
                    <MDBCol md="3" >
                            {/* UploadFile */}
                             <input id="file"
                                type="file"
                                accept=".txt"   
                                multiple={false}
                                key={this.state.file?.name}
                                onChange={ this.handleFileChange } hidden/>
                            <label className="label-upload" htmlFor="file">Choose file</label>
                    </MDBCol>
                    <MDBCol md="5">
                            {/* Show file */}
                            <MDBInput 
                                type='text'
                                label={file?.name}
                                value={value}
                                disabled 
                            />
                    </MDBCol>
                    <MDBCol md="4">
                            {/* Upload File */}
                            <button 
                                className="btn-upload" 
                                onClick={ this.upload }>
                                    Upload            
                            </button>
                            
                            {/* Clean values */}
                            <button 
                                className="btn-clean" 
                                onClick={ this.clearValues }>
                                    Clear            
                            </button>
                            
                    </MDBCol>
                </MDBRow>

                {!this.state.status && 
                <MDBRow middle className="error-indicator"  >
                    <MDBCol md="6" >
                            {/* Error status */}
                            <label >{'There are some errors in the file, verify.'}</label>
                    </MDBCol>
                </MDBRow>}
                <ToastContainer />
                <hr />
            </MDBContainer>
        )
    }

}

export default TreeSource;