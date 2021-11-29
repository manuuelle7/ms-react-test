import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { Component } from 'react'
import { BinTreeNode } from '../../models/BinTreeNode';
import { TreeOutputProps } from '../../models/Props';



/**
 * Class of Tree output
 */
 class TreeOutput extends Component<TreeOutputProps> {

     /**
      * Function to render de node tree elements
      * @param node 
      * @returns 
      */
      private renderNodes = (node: BinTreeNode | null | undefined): any => {
        if (!node) {
            return (
                <MDBContainer 
                    className="card-body"
                    key={Math.random() + 'key-null'}>
                    <MDBCol mid='6'>
                        <MDBCard>
                            <MDBCardBody >
                                <MDBCardTitle>{'null'}</MDBCardTitle>
                                <MDBCardText>
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
            </MDBContainer>  
            );
        } else {
            return (
                <MDBContainer 
                    className={'card-body'}
                    key={node ? node?.id : Math.random()} >
                    <MDBCol mid='6' >
                        <MDBCard className={` ${ this.props.smallValue?.id === node.id ? 'card-body-smallest' : ''}`}>
                            <MDBCardBody  
                            >
                                <MDBCardTitle>{node?.id}</MDBCardTitle>
                                <MDBCardText className="container-json" >
                                    { this.renderNodes(node?.left) }
                                    { this.renderNodes(node?.right) }
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBContainer>  
            );
        }
        
      };

      /**
       * Render
       * @returns 
       */
    render() {
        return (
            <div>
                {this.props.binTreeNode && 
                <MDBContainer className={`container-output ${this.props.binTreeNode ? 'appear' : 'disappear'}`}>
                    <h3 
                        className="grey-text">Tree Output 
                    </h3>
                    <MDBRow middle>
                        <MDBContainer >
                            {
                               this.props.binTreeNode ? this.renderNodes(this.props.binTreeNode) : <div></div>
                            }
                        </MDBContainer>
                    </MDBRow>
                    <hr/>
                </MDBContainer>}
            </div>
        )
    }
}

export default TreeOutput;