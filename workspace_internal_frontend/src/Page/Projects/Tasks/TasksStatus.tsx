import { Button, Chip } from '@mui/material';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { Line } from 'rc-progress';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import taskService from '../../../Services/task-service';
import DialogForm from '../../../Shared/components/DialogForm';
import { Modules } from '../../../Shared/enums/modules';
import { getModulePermission } from '../../../utils/commanFunctions';
import { DateTimeToDateString } from '../../../utils/dateFormat';
import AllTasks from './AllTasks';
import CreateTaskForm from './CreateTaskForm';
import "./tasks.css";
import { FaClock, FaPlus } from 'react-icons/fa';


interface ITaskStatusResponse {
  todo: ITask[];
  inProgress: ITask[];
  testing: ITask[];
  done: ITask[];
  reOpen: ITask[];
}

const initialTasks: ITaskStatusResponse = {
  todo: [],
  inProgress: [],
  testing: [],
  done: [],
  reOpen: [],
};

function TasksStatus() {

  const [tasks, setTasks] = useState<any | []>(initialTasks);
  const [permission, setPermission] = React.useState(null);
  const [createTaskOpenDialog, setCreateTaskOpenDialog] = useState(false);
  const queryClient = useQueryClient();


  React.useEffect(() => {
    (async function () {
      const permission = await getModulePermission(Modules.Tasks);
      setPermission(permission);
    })();
  }, [])

  const { data: getTasks, isLoading } = useQuery<ITaskStatusResponse>({
    queryKey: ['getTasksStatus'],
    queryFn: async () => {
      const res = await taskService.getTaskStatus();
      return res?.data?.data;
    }
  });

  React.useEffect(() => {
    if (getTasks) {
      setTasks(prevTasks => {
        const mappedTasks = {
          todo: getTasks.todo.map(task => ({
            id: task?.id?.toString() ?? '',
            name: task.taskName,
            priority: task.taskPriority,
            deadLine: task.deadLine,
            process: task.taskPercentage || "0",
          })),
          inProgress: getTasks.inProgress.map(task => ({
            id: task?.id?.toString() ?? '',
            name: task.taskName,
            priority: task.taskPriority,
            deadLine: task.deadLine,
            process: task.taskPercentage || "0",
          })),
          testing: getTasks.testing.map(task => ({
            id: task?.id?.toString() ?? '',
            name: task.taskName,
            priority: task.taskPriority,
            deadLine: task.deadLine,
            process: task.taskPercentage || "0",
          })),
          done: getTasks.done.map(task => ({
            id: task?.id?.toString() ?? '',
            name: task.taskName,
            priority: task.taskPriority,
            deadLine: task.deadLine,
            process: task.taskPercentage || "0",
          })),
          reOpen: getTasks.reOpen.map(task => ({
            id: task?.id?.toString() ?? '',
            name: task.taskName,
            priority: task.taskPriority,
            deadLine: task.deadLine,
            process: task.taskPercentage || "0",
          })),
        };
  
        return { ...prevTasks, ...mappedTasks };
      });
    }
  }, [getTasks]);

  async function updateTaskStatusOnBackend(taskId: any, newStatus: any, taskName: any) {
    try {
      const capitalizedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
      let res = {
        status: capitalizedStatus
      };
      await taskService.updateTaskStatus(taskId, res).then((res) => {
        queryClient.invalidateQueries({ queryKey: ['getAllTask'] });
        queryClient.invalidateQueries({ queryKey: ['getTasksStatus'] }); 
        toast.success(`Task ${taskName} moved to ${newStatus} successfully.`);
      })
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }

  function onDragEnd(result: any) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const taskId = tasks[source.droppableId][source.index].id;
    const taskName = tasks[source.droppableId][source.index].name;
    const newStatus = destination.droppableId;

    updateTaskStatusOnBackend(taskId, newStatus, taskName);

    if (source.droppableId !== destination.droppableId) {
      const sourceTasks = [...tasks[source.droppableId]];
      const destTasks = [...tasks[destination.droppableId]];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      const updatedTasks = {
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      };

      setTasks(updatedTasks);
    } else {
      const taskList = [...tasks[source.droppableId]];
      const [removed] = taskList.splice(source.index, 1);
      taskList.splice(destination.index, 0, removed);

      const updatedTasks = {
        ...tasks,
        [source.droppableId]: taskList,
      };

      setTasks(updatedTasks);

    }
  }


  const { data: getAllTasks } = useQuery<ITaskResponse>({
    queryKey: ['getAllTask'],
    queryFn: async () => {
      const res = await taskService.getTasks();
      return res?.data?.data;
    },
    placeholderData: keepPreviousData,
    retry: 1,
  });
  
  return (
    <React.Fragment>
     
        <>
          <div className="create-task">
            <div className="all-project-container">
              <div className="add-project-btn d-flex justify-end" >
                <Button className="btn btn-primary" onClick={() => setCreateTaskOpenDialog(true)}>
                  <span>  <FaPlus style={{ marginRight: "5px" }} />Create Task</span>
                </Button>
              </div>
            </div>
          </div>

          <section className="drag-drop mt-1 white-box">

            <DragDropContext onDragEnd={onDragEnd}>
              {Object.entries(tasks)?.map(([state, tasks]: any) => {
                let isDraggable;
                function getBackgroundColor(state: string, isDraggable?: boolean): string {
                  switch (state) {
                    case "todo":
                      return isDraggable ? "#fef7f6" : "#ef5350";
                    case "inProgress":
                      return isDraggable ? "#e6f3fe" : "#42a5f5";
                    case "testing":
                      return isDraggable ? "#fdfcf3" : "#ffb300";
                    case "done":
                      return isDraggable ? "#edf7ee" : "#4caf50";
                    default:
                      return isDraggable ? "#f1effd" : "gray";
                  }
                }

                return (
                  <div key={state} style={{ width: "25%" }}>
                    <div
                      className={`d-flex justify-between item-center drag-drop-title `}
                      style={{ backgroundColor: getBackgroundColor(state, isDraggable = false), padding: "10px" }}
                    >
                      <span>{state.charAt(0).toUpperCase() + state.slice(1)}</span>
                      {/* <FaEllipsisVertical /> */}
                    </div>
                    <Droppable droppableId={state} >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className='drag-drop-list'
                          style={{
                            backgroundColor: getBackgroundColor(state, isDraggable = true),
                            minHeight: '50px'
                          }}
                        >
                          {tasks?.map((task: any, index: number) => {
                        
                            return (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className='drag-drop-item'
                                  >
                                    <div className="drag-drop-box ">
                                      <div className="first-row mb-1">
                                        <div>
                                          {task.name}
                                        </div>
                                        {/* <div>
                                          <FaEllipsisVertical />
                                        </div> */}
                                      </div>
                                      <div className="progress-bar second-row">
                                        <Line percent={Number(task.process)} strokeWidth={2} strokeColor={`${state === "pending" ? "#ef5350" : state === "onBoard" ? "#42a5f5" : state === "complete" ? "#4caf50" : "#ffb300"}`} />
                                        <small className='text-muted'>
                                          {`${task.process}%`}
                                        </small>
                                      </div>
                                      <div className="third-row d-flex item-center" style={{ gap: "10px" }}>
                                        <FaClock style={{ color: "gray" }} />
                                        <small className='text-muted'>
                                          {DateTimeToDateString(task.deadLine)}
                                        </small>
                                      </div>
                                      <div className="forth-row">
                                        <Chip
                                          label={task.priority}
                                          style={{
                                            backgroundColor: `${task?.priority === "High" ? "rgba(242,17,54,.12)" : task?.priority === "Medium" ? "rgba(255,152,0,.12)" : "rgba(15,183,107,.12)"}`,
                                            color: `${task?.priority === "High" ? "#e63c3c" : task?.priority === "Medium" ? "#f39c12" : "#26af48"}`,
                                          }} />
                                      </div>

                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            )
                          })}

                          {provided.placeholder}
                        </div>
                      )
                      }
                    </Droppable>
                  </div>
                )
              }

              )}
            </DragDropContext >
          </section >

          <AllTasks allTasks={getAllTasks} />


          <DialogForm
            scroll="body"
            maxWidth="md"
            title="Create Task"
            className='dialog-form'
            openDialog={createTaskOpenDialog}
            handleDialogClose={() => setCreateTaskOpenDialog(false)}
            bodyContent={<CreateTaskForm setCreateTaskOpenDialog={setCreateTaskOpenDialog} />}
          />
        </>
      
    </React.Fragment>
  )
}



export default TasksStatus;