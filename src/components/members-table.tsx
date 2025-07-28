import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Member } from "@/db/schema";
import MembersTableAction from "./members-table-action";

interface MembersTableProps {
  members: Member[];
}

export default function MembersTable({ members }: MembersTableProps) {
  return (
    <Table>
      <TableCaption>Above is a list of organization members.</TableCaption>
      <TableCaption className="italic">
        Below is a list of users not in the organization.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.user.name}</TableCell>
            <TableCell>{member.user.email}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell className="text-right">
              <MembersTableAction memberId={member.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
