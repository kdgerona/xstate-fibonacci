import { assign, send, sendParent } from 'xstate'

const implementation = {
    actions: {
      assignFibonacciCount: assign({
          fibonacci: (_, event: any) => event.payload
      }),
      updateFibonacci: assign((context: any, { payload }: any) => {
          return {
            fibonacci: payload.fibonacci,
            first: payload.first,
            second: payload.second,
            task_queue: [...context.task_queue, [payload.first,payload.second]],
          }
        }
      ),
      resetFibonacci: assign({
        fibonacci: 10,
        first: 0,
        second: 1,
      }),
      sendToParent: sendParent({
          type: 'SEND_TO_PRODUCER',
          payload: (_: any, event: any) => event.payload
      }),
      log: (context: any) => console.log(context)
    },
    guards: {
      fibonacciHasReachedMax: (context: any) => context.fibonacci <= 0
    },
    services: {
      waitForUserEntry: () => (send: any) => {
          console.log('\n ***** INPUT FIBONACCI COUNT *****')
          process.stdin.once('data', (data: any) => {
              const input = parseInt(data.toString())
              send({
                  type: 'START',
                  payload: input
              })
          })
      },
      fibonacciCalculation: (context: any) => (send: any) => {
        const { fibonacci, first, second } = context
        
        const [newFirst, newSecond] = [second, first + second]
          
        // This is where I will add the Kafka Producer
        send({
            type: 'SEND_TO_PARENT',
            payload: {
                topic: 'jobs',
                job: [newFirst,newSecond]
            }
        })

        console.log('** hi',context)
        
        send({
          type: 'UPDATE_FIBONACCI',
          payload: {
            fibonacci: fibonacci - 1,
            first: newFirst,
            second: newSecond,
          }
        })
      }
    },
    activities: {},
    delays: {}
  }

  export default implementation