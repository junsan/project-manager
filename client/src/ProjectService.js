import axios from 'axios';

const url = 'http://localhost:5000/api/projects/';

class ProjectService {
    static getProjects() {
        return new Promise((resolve,reject) => {
            try {
                axios.get(url)
                .then(result => {
                    resolve(result.data);
                });
            } catch(err) {
                reject(err)
            }
        });
    }

    static insertProject(project) {
        return axios.post(url, {
            name: project.name,
            tasks: project.tasks,
            created_at: new Date()
        })
    }

    static deleteProject(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ProjectService;