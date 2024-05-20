<template>
  <div>
        <Upload :action="upload" :before-upload="handleFileUpload">
          <Button @click="achieve"> 选择上传csv文件 </Button>
        </Upload>
    <div ref="graph" id="viz"></div>
    <Modal v-model="isModalVisible" title="Update Node Information">
      <Form ref="form" :model="formState" @on-submit.prevent="handleSubmit">
        <FormItem label="Node Name">
          <Input v-model="formState.nodeName" placeholder="Enter new node name"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="updateNodeName">Update Name</Button>
        </FormItem>
        <FormItem label="New Node Name">
          <Input v-model="formState.newNodeName" placeholder="Enter name for new node"></Input>
          <Button type="primary" @click="addNode">Add Node</Button>
        </FormItem>
        <FormItem label="Delete Node">
          <Button type="error" @click="deleteNode">Delete Node</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Neovis from 'neovis.js';
import axios from 'axios';

export default {
  name: 'KnowledgeGraph',
  data() {
    return {
      isModalVisible: false,
      nodeName: '',
      nodeId: null,
      formState: {
        nodeName: ''
      }
    };
  },
  mounted() {
    
    const config = {
      containerId: this.$refs.graph.id,
      neo4j: {
        serverUrl: 'bolt://localhost:7687',
        serverUser: 'neo4j',
        serverPassword: 'Qaz123698745',
      },
      physics: {
             enabled: true,
             solver: 'barnesHut',
             barnesHut: {
                 gravitationalConstant: -5000, // 控制弹性
                 springConstant: 0.04,
                 springLength: 95
             }
         },
      visConfig: {
        
         edges: {
             arrows: {
                 to: {enabled: true}
             }
         },
         
     },
      labels: {
        TreeNode: {
          label: 'name',
          group:'level',
          [Neovis.NEOVIS_ADVANCED_CONFIG]: {
            function: {
              title: (node) => {
                const name = node.properties.name || 'N/A';
                return `name: ${name}`;
              }
            }
          }
        }
      },
      relationships: {
        '树关系': {
          label: 'r',
          [Neovis.NEOVIS_ADVANCED_CONFIG]: {
            arrows: {
              to: { enabled: true, scaleFactor: 1.2 }
            },
            caption: true
          }
        }
      },
      initialCypher: 'MATCH (n:TreeNode)-[r:`树关系`]->(m:TreeNode) RETURN *',
      arrows: true
    };

    const viz = new Neovis(config);
    viz.render();
    
    viz.registerOnEvent('clickNode', (event) => {
      if (event.node) {
        const node = event.node;
        const properties = node.raw.properties;
        this.nodeName = properties.name || 'N/A';
        this.isModalVisible = true;
      }
    });
  },
  methods: {    
    handleFileUpload(file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://localhost:8080/importCSV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.refreshGraph();
        this.$Message.success('CSV file imported successfully!');
      })
      .catch(error => {
        console.error('Error importing CSV file:', error);
        this.$Message.error('Failed to import CSV file.');
      });

      return false; // Prevent the default upload behavior
    },
    addNode() {
      const formData = new FormData();
      formData.append('parentNodeName', this.nodeName);
      formData.append('treeNodeName', this.formState.newNodeName);

      axios.post('http://localhost:8080/addTreeNode', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.isModalVisible = false;
        this.refreshGraph();
        this.$Message.success('New node added successfully!');
      })
      .catch(error => {
        console.error('Error adding new node:', error);
        this.$Message.error('Failed to add new node.');
      });
    },
    updateNodeName() {
      const formData = new FormData();
      formData.append('treeNodeName', this.nodeName);
      formData.append('newNodeName', this.formState.nodeName);

      axios.post('http://localhost:8080/updateTreeNode', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.isModalVisible = false;
        this.refreshGraph();
        this.$Message.success('Node name updated successfully!');
      })
      .catch(error => {
        console.error('Error updating node name:', error);
        this.$Message.error('Failed to update node name.');
      });
    },
    deleteNode() {
      const formData = new FormData();
      formData.append('treeNodeName', this.nodeName);
      axios.post('http://localhost:8080/deleteTreeNode', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.isModalVisible = false;
        this.refreshGraph();
        this.$Message.success('Node deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting node:', error);
        this.$Message.error('Failed to delete node.');
      });
    },
    refreshGraph() {
      if (this.viz) {
        this.viz.destroy();
      }
      const config = {
        containerId: this.$refs.graph.id,
        neo4j: {
          serverUrl: 'bolt://localhost:7687',
          serverUser: 'neo4j',
          serverPassword: 'Qaz123698745',
        },
              visConfig: {
        
         edges: {
             arrows: {
                 to: {enabled: true}
             }
         },
     },
        labels: {
          TreeNode: {
            label: 'name',
            group:'level',
            [Neovis.NEOVIS_ADVANCED_CONFIG]: {
              function: {
                title: (node) => {
                  const name = node.properties.name || 'N/A';
                  return `name: ${name}`;
                }
              }
            }
          }
        },
        relationships: {
          '树关系': {
            label: 'r',
            
          }
        },
        initialCypher: 'MATCH (n:TreeNode)-[r:`树关系`]->(m:TreeNode) RETURN *'
      };

      const viz = new Neovis(config);
      viz.render();

      viz.registerOnEvent('clickNode', (event) => {
        if (event.node) {
          const node = event.node;
          const properties = node.raw.properties;
          this.nodeName = properties.name || 'N/A';
          this.isModalVisible = true;
        }
      });
    }
  }
};
</script>
