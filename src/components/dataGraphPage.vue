<template>
  <div>
    <div ref="graph" id="viz" style="height:500px"></div>
    <Button @click="isModalVisible = true"> 添加节点 </Button>

    <Modal v-model="isModalVisible" title="Update Node Information" @on-ok="submit">
      <Form ref="form" :model="formState" @on-submit.prevent="handleSubmit">
        <FormItem label="ParentNode Name">
          <Input v-model="formState.nodeName" placeholder="Enter ParentNode Name"></Input>
        </FormItem>
        <FormItem label="Relation">
          <Input v-model="formState.relation" placeholder="Enter relation for new node"></Input>
        </FormItem>
        <FormItem label="NewNode Name">
          <Input v-model="formState.newNode" placeholder="Enter name for new node"></Input>
        </FormItem>
        <FormItem label="Select NewNode label">
          <Input v-model="formState.newNodeLabel" placeholder="Enter label for new node"></Input>
          <Button @click="addLabel"> 添加标签 </Button>
          <div v-if="isNeovisVisible" ref="newgraph" id="newviz" style="height:500px"></div>
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
      isNeovisVisible: false,
      isModalVisible: false,
      nodeName: '',
      nodeId: null,
      formState: {
        nodeName: '',
        relation:'',
        newNode:'',
        newNodeLabel:'',
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
      visConfig: {
        edges: {
          arrows: {
            to: { enabled: true }
          }
        },
      },
      labels: {
        AnyNode: {
          label: 'name',
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
          '关系': {
            label: 'r',
          }
        },
      initialCypher: 'MATCH (n:AnyNode)-[r:`关系`]->(m:AnyNode) RETURN *',
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
    submit() {
  const formData = new FormData();
  formData.append('treeNodeName', this.formState.newNode);
  formData.append('parentNodeName', this.formState.nodeName);
  formData.append('relation', this.formState.relation);
  formData.append('label', this.formState.newNodeLabel);

  axios.post('http://localhost:8080/addNode', formData, {
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
    console.error('Error response:', error.response);
    this.$Message.error('Failed to add new node.');
  });
},
    addLabel() {
      this.isNeovisVisible = true;
      this.$nextTick(() => {
        const config1 = {
          containerId: this.$refs.newgraph.id,
          neo4j: {
            serverUrl: 'bolt://localhost:7687',
            serverUser: 'neo4j',
            serverPassword: 'Qaz123698745',
          },
          visConfig: {
          edges: {
            arrows: {
              to: { enabled: true }
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

        const newviz = new Neovis(config1);
        newviz.render();

        newviz.registerOnEvent('clickNode', (event) => {
          if (event.node) {
            const node = event.node;
            const properties = node.raw.properties;
            this.nodeName = properties.name || 'N/A';
            this.formState.newNodeLabel = this.nodeName
          }
        });
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
            to: { enabled: true }
          }
        },
      },
      labels: {
        AnyNode: {
          label: 'name',
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
          '关系': {
            label: 'r',
          }
        },
      initialCypher: 'MATCH (n:AnyNode)-[r:`关系`]->(m:AnyNode) RETURN *',
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
    }
  }
};
</script>
