<template>
  <div>
    <ul>
      <li v-for="node in treeData" :key="node.id" class="tree-level">
        <span @click="toggleNode(node)">
          {{ node.name }}
          <span v-if="node.children && node.children.length > 0">
            [{{ node.expanded ? '-' : '+' }}]
          </span>
        </span>
        <ul v-if="node.expanded && node.children && node.children.length > 0" class="tree-level">
          <recursive-tree :treeData="node.children"></recursive-tree>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RecursiveTree',
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toggleNode(node) {
      if (node.children && node.children.length > 0) {
        this.$set(node, 'expanded', !node.expanded);
      }
    },
    generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  },
  components: {
    RecursiveTree: {
      name: 'RecursiveTree',
      props: ['treeData'],
      template: `
        <ul>
          <li v-for="node in treeData" :key="node.id" class="tree-level">
            <span @click="toggleNode(node)">
              {{ node.name }}
              <span v-if="node.children && node.children.length > 0">
                [{{ node.expanded ? '-' : '+' }}]
              </span>
            </span>
            <ul v-if="node.expanded && node.children && node.children.length > 0" class="tree-level">
              <recursive-tree :treeData="node.children"></recursive-tree>
            </ul>
          </li>
        </ul>
      `,
      methods: {
        toggleNode(node) {
          if (node.children && node.children.length > 0) {
            this.$set(node, 'expanded', !node.expanded);
          }
        }
      }
    }
  },
  created() {
    // 初始化每个节点的 expanded 属性为 false
    const initializeNodes = (nodes) => {
      nodes.forEach(node => {
        this.$set(node, 'expanded', false);
        if (node.children && node.children.length > 0) {
          initializeNodes(node.children);
        }
      });
    };
    initializeNodes(this.treeData);
  }
};
</script>

<style>
.tree-level {
  margin-left: 20px; /* 调整缩进的距离 */
}
</style>
