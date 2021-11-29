import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react'
import { BinTreeNode } from '../../models/BinTreeNode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TreeJsonProps, TreeJsonState } from '../../models/Props';
/**
 * Class of Tree json
 */
 class TreeJson extends Component<TreeJsonProps, TreeJsonState> {
     /**
     * Auxiliars variables
     */
    private maxLevel = -1;
    private res = new BinTreeNode(null, null, null);
    
     /**
      * Constructor
      */
    constructor(props: any) {
       super(props);
       this.state = {treeJsonEdit: props.treeText, status: true, active: false};
       
    }

    //#region Events
    /**
      * Function when text area change
      * @param e eventInput
      */
     private onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const valueInput = e.target.value;
        this.props.treeOutput(null);
        this.props.treeState(valueInput);
        let treeNode: BinTreeNode = new BinTreeNode(null,null,null);
        
        try {
            treeNode = JSON.parse(valueInput);
            this.setState({treeJsonEdit: valueInput, status: true});
            this.props.treeOutput(treeNode);
            const smallTree = this.findSmallestNode(treeNode, 0);
            this.props.smallValueState(smallTree);
        } catch (e) {
            if (!toast.isActive(1)) {
                toast.error("There are an error. verify",{autoClose:3000, theme:'colored', toastId:1});
                this.setState({status: false, active: true});
            }
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

    //#endregion

    /**
     * Render
     * @returns 
     */
    render() {
        const valueEditable = this.props.treeText;
        return (
            <MDBContainer >
                {valueEditable &&
                <div>
                <h3 
                    className="grey-text">Tree text 
                </h3>
                <MDBRow middle>
                    {/* edit JSON */}
                    <MDBCol md="12" className={`${valueEditable ? 'appear' : 'disappear'}`}>
                    
                            <textarea 
                                id="treeText"
                                className={`form-control ${this.state.status? 'jsonCorrect' : 'jsonError'}`}
                                rows={13} 
                                onChange={this.onChange}
                                value={valueEditable}
                            />
                            <ToastContainer />
                    </MDBCol>
                </MDBRow>
                <hr/> </div>}
            </MDBContainer>
        )
    }

}

export default TreeJson;