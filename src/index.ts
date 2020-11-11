import { interpret } from 'xstate'
import ParentMachine from './machines/parent'

const parentService = interpret(ParentMachine)
parentService.start()
