import { create } from "zustand";

interface State {
  open: string
  projects: {
    id: string
    name: string
    todo: {cid: string, task:string}[]
    inpro: {cid: string, task:string}[]
    done: {cid: string, task:string}[]
  }[]
}

interface Actions {
  setOpen: (id:string) => void
  setProjects: (propts:State['projects'][0]) => void
  updateProjectTitle: (projectid:string, title:string) => void
  deleteProject: (id:string) => void

  setTodos: (key:string, id:string, taskdesc:string) => void
  updateTodo: (key:string, id:string, taskdesc:string) => void
  deleteTodo: (key:string, id:string) => void

  setInProgress: (key:string, id:string, taskdesc:string) => void
  updateInProgress: (key:string, id:string, taskdesc:string) => void
  deleteInProgress: (key:string, id:string) => void
  
  setDone: (key:string, id:string, taskdesc:string) => void
  updateDone: (key:string, id:string, taskdesc:string) => void
  deleteDone: (key:string, id:string) => void

  moveInTodo: (key:string, currentStat:string, id:string, taskdesc:string) => void
  moveToWIP: (key:string, currentStat:string, id:string, taskdesc:string) => void
  moveToDone: (key:string, currentStat:string, id:string, taskdesc:string) => void
}

export const useProjects = create<State & Actions>((set) => {
  return {
    open: localStorage.getItem('idkey') || '',
    setOpen: (id) => set((state) => {
      localStorage.setItem('idkey', id);
      return {
        ...state,
        open: id
      }
    }),
    projects: JSON.parse(localStorage.getItem('localprojectkey')) || [
      {
        id: 'dasdas',
        name:'Project 1',
        todo: [{cid:'xc3r1', task:'Develop components'}],
        inpro: [{cid:'xc3r2', task:'Set-up project'}],
        done: [{cid:'xc3r3', task:'Test api'}],
      }
    ],
    setProjects: (propts) => set((state) => {
      const updatedProjects = [propts, ...state.projects];
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    updateProjectTitle: (projectid, title) => set((state) => {
      const updatedProject = state.projects.map((project) => {
        if(project.id === projectid){
          return {...project, name: title}
        }
        return project
      })
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProject))
      return {
        ...state,
        projects: updatedProject
      }
    }),
    deleteProject: (id) => set((state) => {
      const updatedProjects = state.projects.filter((project) => project.id != id );
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }) ,


    // From at this line, are the Tasks Management functions
    setTodos:(key, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          project.todo = [{cid: id, task:taskdesc}, ...project.todo];
        }
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    updateTodo:(key, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newtodo = project.todo.map((item) => {
            if(item.cid === id){
              return {...item, task:taskdesc};
            }
            // else if no changes occurs
            return item
          });
          return {...project, todo:newtodo}
        }
        // else if no changes occurs
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    deleteTodo: (key, id) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newtodo = project.todo.filter((item) => item.cid != id);
          return {...project, todo:newtodo}
        }
        // else if no changes occurs
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    

    setInProgress:(key, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          project.inpro = [{cid:id, task:taskdesc}, ...project.inpro];
        }
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    updateInProgress:(key, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newInProgress = project.inpro.map((item) => {
            if(item.cid === id){
              return {...item, task:taskdesc};
            }
            // else if no changes occurs
            return item
          });
          return {...project, inpro:newInProgress}
        }
        // else if no changes occurs
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    deleteInProgress: (key, id) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newinprogress = project.inpro.filter((item) => item.cid != id);
          return {...project, inpro:newinprogress}
        }
        // else if no changes occurs
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),


    setDone:(key, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          project.done = [{cid:id, task:taskdesc}, ...project.done];
        }
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    updateDone:(key, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newDone = project.done.map((item) => {
            if(item.cid === id){
              return {...item, task:taskdesc};
            }
            // else if no changes occurs
            return item
          });
          return {...project, done:newDone}
        }
        // else if no changes occurs
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    deleteDone: (key, id) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newDone = project.done.filter((item) => item.cid != id);
          return {...project, done:newDone}
        }
        // else if no changes occurs
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),

    // Change tasks status
    moveInTodo: (key, currentStat, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newTodo = [{cid:id, task:taskdesc}, ...project.todo];
          if(currentStat === 'inprogress'){ // always true
            const removeInWIP = project.inpro.filter((item) => item.cid != id); 
            return {...project, todo: newTodo, inpro:[...removeInWIP]}
          }
          else if(currentStat === 'done'){ // always true
            const removeInDone = project.done.filter((item) => item.cid != id);
            return {...project, todo: newTodo, done:[...removeInDone]}
          }
        }
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    moveToWIP: (key, currentStat, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newInProgress = [{cid:id, task:taskdesc}, ...project.inpro];
          if(currentStat === 'todos'){ // always true
            const removeInTodo = project.todo.filter((item) => item.cid != id); 
            return {...project, inpro: newInProgress, todo:[...removeInTodo]}
          }
          else if(currentStat === 'done'){ // always true
            const removeInDone = project.done.filter((item) => item.cid != id);
            return {...project, inpro: newInProgress, done:[...removeInDone]}
          }
        }
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
    moveToDone: (key, currentStat, id, taskdesc) => set((state) => {
      const updatedProjects = state.projects.map((project) => {
        if(project.id === key){
          const newDone = [{cid:id, task:taskdesc}, ...project.done];
          if(currentStat === 'todos'){ // always true
            const removeInTodo = project.todo.filter((item) => item.cid != id); 
            return {...project, done: newDone, todo:[...removeInTodo]}
          }
          else if(currentStat === 'inprogress'){ // always true
            const removeInWIP = project.inpro.filter((item) => item.cid != id); 
            return {...project, done: newDone, inpro:[...removeInWIP]}
          }
        }
        return project
      });
      localStorage.setItem('localprojectkey', JSON.stringify(updatedProjects));
      return {
        ...state,
        projects: updatedProjects
      }
    }),
  }
});

