import { FC_01 } from './handlers/FC-01'
import { FC_02 } from './handlers/FC-02'
import { FC_03 } from './handlers/FC-03'
import { FC_04 } from './handlers/FC-04'
import { FC_05 } from './handlers/FC-05'
import { FC_06 } from './handlers/FC-06'
import { FC_07 } from './handlers/FC-07'
import { FC_08 } from './handlers/FC-08'
export const failureCaseRegistry = [FC_01, FC_02, FC_03, FC_04, FC_05, FC_06, FC_07, FC_08].filter((failureCase) => failureCase.enabled)
