<template>
  <div class="hello">
    <h1>Project Management System</h1>
    <input v-model="project.name" type="text"> <input v-model="project.tasks" type="number" > 
    <button @click="insertProject">Add</button>
    <ul>
      <li v-for="project in projects" v-bind:key="project._id">
        {{ project.name }}
        <button @click="deleteProject(project._id)">x</button>
      </li>
    </ul>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import ProjectService from '../ProjectService'

export default {
  name: 'ProjectsComponent',
  data() {
    return {
      projects: [],
      error: '',
      project: {
        name: '',
        tasks: 0
      }
    }
  },
  async created() {
    try {
      this.projects = await ProjectService.getProjects();
      console.log(this.projects);
    } catch(err) {
      this.error = err;
    }
  },
  methods: {
    insertProject() {
       ProjectService.insertProject(this.project);
       this.projects.push(this.project);
       this.project.name = '';
       this.project.tasks = 0;
    },
    deleteProject(id) {
      ProjectService.deleteProject(id);
      this.projects = this.projects.filter(project => project._id !== id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
